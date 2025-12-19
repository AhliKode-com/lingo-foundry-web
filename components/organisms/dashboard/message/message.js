"use client"

import {useState, useEffect, useRef} from "react"
import {FiSearch, FiMoreVertical, FiSend, FiVideo, FiCalendar, FiEdit, FiPlus, FiArrowLeft, FiX} from "react-icons/fi"
import {BsCircleFill} from "react-icons/bs"
import {useGetMessageList} from "@/apis/dashboard/message/getMessageList";
import MessagingSkeleton from "@/components/organisms/dashboard/message/message-skeleton";
import { format, isToday } from 'date-fns';
import { useGetUserList } from "@/apis/dashboard/message/getListUser";
import {useSendMessage} from "@/apis/dashboard/message/postSendMessage";
import {useAuth} from "@/context/AuthContext";
import {toast} from "react-toastify";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";

const MessageApp = () => {
    // context
    const { user: thisUser } = useAuth();
    const searchParams = useSearchParams();
    const userId = searchParams.get('userId');
    
    // Ref for chat messages container
    const messagesContainerRef = useRef(null);

    // apis
    const { data, loading } = useGetMessageList();
    const { data: listUsers, getUserList, loading: loadingUsers } = useGetUserList();
    const { sendMessage } = useSendMessage();

    // messaging state
    const [showChat, setShowChat] = useState(false)
    const [selectedConversation, setSelectedConversation] = useState(null)
    const [selectedMessages, setSelectedMessages] = useState([])

    // search user modal state
    const [showComposeModal, setShowComposeModal] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery)

    // message result state
    const [transformedConversations, setTransformedConversations] = useState([])

    // react-hook-form for message
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        handleSendMessage(data.message);
        reset(); // Clear the input after sending
    };

    // Auto-scroll to bottom when messages change
    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [selectedMessages]);

    // Call getUserList when search query changes
    useEffect(() => {
        if (showComposeModal) {
            getUserList(searchQuery);
        }
    }, [debouncedQuery, showComposeModal]);

    // Call getUserList when component mounts if userId is present
    useEffect(() => {
        if (userId && !listUsers) {
            getUserList("");
        }
    }, [userId]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedQuery(searchQuery)
        }, 500)

        return () => clearTimeout(timeout)
    }, [searchQuery])

    // format time helper function
    const formatMessageTime = (dateString) => {
        const date = new Date(dateString);
        if (isToday(date)) {
            return format(date, 'h:mm a');
        } else {
            return format(date, 'MMM d');
        }
    }

    // get short time for preview
    const getShortTime = (dateString) => {
        const date = new Date(dateString);
        if (isToday(date)) {
            return "today";
        } else {
            // Calculate days difference
            const daysDiff = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));
            if (daysDiff < 7) {
                return `${daysDiff}d`;
            } else {
                return format(date, 'MMM d');
            }
        }
    }

    // transform API data to match the conversations structure needed for the UI
    useEffect(() => {
        if (!data) return;

        // Create a map to group messages by conversation
        const conversationMap = new Map();

        // Process each item in the data array
        data.forEach(item => {
            const user = item.userVO;
            const lastMessage = item.userMessageVOS.length > 0 ?
                item.userMessageVOS[item.userMessageVOS.length - 1] : null;

            if (!lastMessage) return;

            // Generate a unique conversation ID
            // Using the message ID of the first message in each conversation
            const conversationId = user.id;

            const existingConversation = conversationMap.get(conversationId);

            if (existingConversation) {
                // Add this message to existing conversation
                existingConversation.messages.push({
                    id: lastMessage.id,
                    sender: lastMessage.sender.id === user.id ? "tutor" : "user",
                    text: lastMessage.content,
                    time: formatMessageTime(lastMessage.sentAt),
                    fullTime: lastMessage.sentAt
                });

                // Update the preview if this is more recent
                if (new Date(lastMessage.sentAt) > new Date(existingConversation.lastMessageTime)) {
                    existingConversation.message = lastMessage.content;
                    existingConversation.time = getShortTime(lastMessage.sentAt);
                    existingConversation.lastMessageTime = lastMessage.sentAt;
                    existingConversation.unread = !lastMessage.isRead;
                }
            } else {
                // Create a new conversation entry
                conversationMap.set(conversationId, {
                    id: conversationId, // Using message ID as unique conversation ID
                    userId: user.id,
                    name: user?.firstName !== null && user?.lastName !== null ?  `${user.firstName} ${user.lastName}`.trim() : `${user.username}`.split("@")[0],
                    message: lastMessage.content,
                    time: getShortTime(lastMessage.sentAt),
                    lastMessageTime: lastMessage.sentAt,
                    online: false,
                    unread: !lastMessage.isRead,
                    avatar: user.profilePhotoUrl || "/placeholder.svg?height=40&width=40",
                    messages: [{
                        id: lastMessage.id,
                        sender: lastMessage.sender.id === user.id ? "tutor" : "user",
                        text: lastMessage.content,
                        time: formatMessageTime(lastMessage.sentAt),
                        fullTime: lastMessage.sentAt
                    }]
                });
            }
        });

        // Sort conversations by most recent message
        const sortedConversations = Array.from(conversationMap.values())
            .sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));

        sortedConversations.forEach(user => {
            user.messages.sort((a, b) => new Date(a.fullTime) - new Date(b.fullTime));
        });

        setTransformedConversations(sortedConversations);
    }, [data]);

    const handleSendMessage = async (message) => {
        if (message.trim() && selectedConversation) {
            // Call API
            const result = await sendMessage({ recipientId: selectedConversation, content: message });

            if (result !== null) {
                const newMessage = {
                    id: Date.now(), // Temporary ID
                    sender: "user",
                    text: message,
                    time: formatMessageTime(new Date()),
                    fullTime: new Date().toISOString()
                };

                // Find and update the selected conversation
                let updatedConversations = transformedConversations.map(conv => {
                    if (conv.id.toString() === selectedConversation.toString()) {
                        return {
                            ...conv,
                            messages: [...conv.messages, newMessage],
                            message: message, // Update the preview
                            time: "just now",
                            lastMessageTime: new Date().toISOString()
                        };
                    }
                    return conv;
                });

                // Sort conversations by most recent message
                updatedConversations = updatedConversations
                    .sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));

                // Update selected messages
                if (Array.isArray(selectedMessages)) {
                    setSelectedMessages([...selectedMessages, newMessage]);
                } else {
                    setSelectedMessages([newMessage]);
                }

                setTransformedConversations(updatedConversations);
            }
        }
    }

    const handleConversationClick = (id) => {
        const selected = transformedConversations.find(conv => conv.id.toString() === id.toString());
        if (selected) {
            setSelectedConversation(id);
            setSelectedMessages(selected.messages || []);
            setShowChat(true);
        }
    }

    const handleBackToList = () => {
        setShowChat(false);
    }

    // New function to handle compose button click
    const handleComposeClick = () => {
        setShowComposeModal(true);
        getUserList(""); // Initial load of users
    }

    // Handle selecting a user from the compose modal or URL parameter
    const handleSelectUser = (user, fromUrl = false) => {
        if (thisUser && user.id === thisUser.id) {
            if (!fromUrl) {
                // Close the modal only if not called from URL
                setShowComposeModal(false);
                setSearchQuery("");
            }
            toast.info("you cannot message yourself")
            return
        }

        const exist = transformedConversations.filter((val) => val.id.toString() === user.id.toString());
        if (exist.length > 0) {
            // Select the conversation
            handleConversationClick(user.id)

            if (!fromUrl) {
                // Close the modal only if not called from URL
                setShowComposeModal(false);
                setSearchQuery("");
            }
            return
        }

        // Create a new conversation ID (for new conversations)
        const newConversationId = user.id;

        // Create a new conversation placeholder
        const newConversation = {
            id: user.id,
            userId: user.id,
            name: `${user.firstName} ${user.lastName}`.trim(),
            message: "",
            time: "new",
            lastMessageTime: new Date().toISOString(),
            online: false,
            unread: false,
            avatar: user.profilePhotoUrl || "/placeholder.svg?height=40&width=40",
            messages: []
        };

        const updatedConversations = [newConversation, ...transformedConversations];
        setTransformedConversations(updatedConversations);

        // Select the new conversation
        setSelectedConversation(newConversationId);
        setSelectedMessages([]);
        setShowChat(true);

        if (!fromUrl) {
            // Close the modal only if not called from URL
            setShowComposeModal(false);
            setSearchQuery("");
        }
    }

    // If no conversation is selected yet, and we have conversations, select the first one
    useEffect(() => {
        if (!selectedConversation && transformedConversations.length > 0 && !showChat) {
            handleConversationClick(transformedConversations[0].id);
        }
    }, [transformedConversations, selectedConversation, showChat]);

    // Handle userId from URL
    useEffect(() => {
        if (userId && !loadingUsers) {
            // First, try to find the user in existing conversations
            const existingConversation = transformedConversations.find(conv => conv.id.toString() === userId.toString());
            if (existingConversation) {
                handleConversationClick(userId);
                return;
            }

            // If not found in conversations, try to find in user list
            const user = listUsers?.find(u => u.id.toString() === userId.toString());
            if (user) {
                handleSelectUser(user, true); // Pass true to indicate it's from URL
            } else {
                // Fetch all users first, then find the specific user
                getUserList("").then(() => {
                    // After fetching, try to find the user again
                    setTimeout(() => {
                        const userAfterFetch = listUsers?.find(u => u.id.toString() === userId.toString());
                        if (userAfterFetch) {
                            handleSelectUser(userAfterFetch, true); // Pass true to indicate it's from URL
                        }
                    }, 100);
                });
            }
        }
    }, [userId, listUsers, loadingUsers, transformedConversations]);

    if (loading || data === null) {
        return <MessagingSkeleton />
    }

    // Get the selected conversation data
    const selectedConversationData = transformedConversations.find(
        conv => conv.id.toString() === selectedConversation?.toString()
    ) || (transformedConversations.length > 0 ? transformedConversations[0] : null);

    return (
        <div
            className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            style={{height: "80vh"}}
        >
            <div className="flex h-full flex-col md:flex-row">
                {/* Left sidebar - Conversations list */}
                <div
                    className={`w-full md:w-auto md:max-w-xs border-r border-gray-200 ${showChat ? "hidden md:block" : "block"}`}
                >
                    <div className="p-4 border-b border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-xl font-semibold text-gray-800">Message</h1>
                            <button
                                className="text-[#E15C31] flex items-center text-sm cursor-pointer"
                                onClick={handleComposeClick}
                            >
                                <FiPlus className="mr-1"/> Compose
                            </button>
                        </div>
                    </div>

                    <div className="overflow-y-auto" style={{height: "calc(80vh - 120px)"}}>
                        {transformedConversations.map((conversation) => (
                            <div
                                key={conversation.id}
                                className={`flex items-start p-3 hover:bg-gray-50 cursor-pointer ${conversation.id.toString() === selectedConversation?.toString() ? "bg-orange-100" : ""}`}
                                onClick={() => handleConversationClick(conversation.id)}
                            >
                                <div className="relative mr-3">
                                    <img
                                        src={conversation.avatar || "/placeholder.svg"}
                                        alt={conversation.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    {conversation.online && (
                                        <span className="absolute bottom-0 right-0">
                                            <BsCircleFill className="text-green-500 text-xs"/>
                                        </span>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between">
                                        <h3 className="text-sm font-medium text-gray-900 mr-2">{conversation.name}</h3>
                                        <span className="text-xs text-gray-500">{conversation.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 truncate">{conversation.message}</p>
                                </div>
                            </div>
                        ))}
                        {transformedConversations.length === 0 && (
                            <div className="text-center p-4 text-gray-500">
                                No conversations found
                            </div>
                        )}
                    </div>
                </div>

                {/* Right side - Chat area */}
                <div className={`flex-1 flex flex-col ${!showChat ? "hidden md:flex" : "flex"} h-full`}>
                    {/* Chat header */}
                    {selectedConversationData && (
                        <>
                            <div className="border-b border-gray-200 p-3 md:p-[14px] flex items-center flex-shrink-0">
                                <button onClick={handleBackToList} className="mr-2 md:hidden text-gray-500 cursor-pointer">
                                    <FiArrowLeft size={20}/>
                                </button>
                                <img
                                    src={selectedConversationData.avatar || "/placeholder.svg?height=50&width=50"}
                                    alt="Profile"
                                    className="w-10 h-10 md:w-12 md:h-12 rounded-full mr-2 md:mr-3"
                                />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center flex-wrap">
                                        <span className="text-sm font-medium mr-1">{selectedConversationData.name}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Chat messages */}
                            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-3 md:p-4 bg-gray-50">
                                {selectedMessages.length > 0 ? (
                                    <>
                                        {selectedMessages.map((msg, index) => {
                                            // Check if we need to show the date
                                            const showDate = index === 0 ||
                                                (index > 0 && new Date(msg.fullTime).toDateString() !==
                                                    new Date(selectedMessages[index-1].fullTime).toDateString());

                                            return (
                                                <div key={msg.id}>
                                                    {showDate && (
                                                        <div className="text-xs text-center text-gray-500 my-2 w-full">
                                                            {isToday(new Date(msg.fullTime)) ? 'Today' :
                                                                format(new Date(msg.fullTime), 'MMMM d, yyyy')}
                                                        </div>
                                                    )}
                                                    <div className={`mb-4 ${msg.sender === "user" ? "flex justify-end" : "flex justify-start"}`}>
                                                        {msg.sender === "tutor" && (
                                                            <div className="flex items-start max-w-[90%] md:max-w-[80%]">
                                                                <div className="mr-2 mt-1">
                                                                    <img
                                                                        src={selectedConversationData.avatar || "/placeholder.svg?height=30&width=30"}
                                                                        alt="Tutor"
                                                                        className="w-6 h-6 md:w-8 md:h-8 rounded-full"
                                                                    />
                                                                </div>
                                                                <div className="bg-[#FFEEE8] rounded-lg p-2 md:p-3">
                                                                    <p className="text-xs md:text-sm">{msg.text}</p>
                                                                    <div className="text-xs text-gray-500 mt-1 text-right">{msg.time}</div>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {msg.sender === "user" && (
                                                            <div className={`bg-[#E15C31] text-white rounded-lg p-2 md:p-3 max-w-[90%] md:max-w-[80%]`}>
                                                                <p className="text-xs md:text-sm">{msg.text}</p>
                                                                <div className="text-xs text-white opacity-70 mt-1 text-right">{msg.time}</div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </>
                                ) : (
                                    <div className="flex h-full items-center justify-center text-gray-500">
                                        Start a conversation
                                    </div>
                                )}
                            </div>

                            {/* Message input */}
                            <form className="border-t border-gray-200 p-3 flex items-center gap-2 bg-white flex-shrink-0" onSubmit={handleSubmit(onSubmit)}>
                                <FiEdit className="text-[#E15C31] flex-shrink-0 w-5 h-5"/>
                                <input
                                    type="text"
                                    {...register('message')}
                                    placeholder="Type your message"
                                    className="flex-1 border-0 focus:ring-0 focus:outline-none text-sm py-2"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSubmit(onSubmit)();
                                        }
                                    }}
                                />
                                <button
                                    type="submit"
                                    className="bg-[#E15C31] text-white rounded-md px-4 py-2 flex items-center text-sm flex-shrink-0 cursor-pointer whitespace-nowrap"
                                >
                                    <span className="hidden sm:inline">Send</span>
                                    <FiSend className="sm:ml-2" />
                                </button>
                            </form>
                        </>
                    )}
                    {!selectedConversationData && (
                        <div className="flex-1 flex items-center justify-center text-gray-500">
                            Select a conversation or start a new one
                        </div>
                    )}
                </div>
            </div>

            {/* Compose Modal */}
            {showComposeModal && (
                <div className="fixed inset-0 bg-opacity-30 backdrop-blur-md flex items-center justify-center z-50 p-4 rounded-xl shadow-lg">
                    <div className="bg-white rounded-lg w-full max-w-md border-gray-400 border-[1px]">
                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                            <h2 className="text-lg font-medium">New Message</h2>
                            <button
                                onClick={() => {
                                    setShowComposeModal(false);
                                    setSearchQuery("");
                                }}
                                className="text-gray-500 hover:text-gray-700 cursor-pointer"
                            >
                                <FiX size={20} />
                            </button>
                        </div>

                        <div className="p-4">
                            <div className="relative mb-4">
                                <FiSearch className="absolute left-3 top-3 text-gray-400"/>
                                <input
                                    type="text"
                                    placeholder="Search for users"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#E15C31]"
                                />
                            </div>

                            <div className="max-h-60 overflow-y-auto">
                                {loadingUsers ? (
                                    <div className="text-center py-4">
                                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-orange-500 border-t-transparent mx-auto"></div>
                                    </div>
                                ) : (
                                    <>
                                        {listUsers && listUsers.length > 0 ? (
                                            listUsers.map(user => (
                                                <div
                                                    key={user.id}
                                                    className="flex items-center p-3 hover:bg-gray-50 cursor-pointer rounded-md"
                                                    onClick={() => handleSelectUser(user, false)}
                                                >
                                                    <div className="relative mr-3">
                                                        <img
                                                            src={user.profilePhotoUrl || "/placeholder.svg?height=40&width=40"}
                                                            alt={`${user.firstName} ${user.lastName}`}
                                                            className="w-10 h-10 rounded-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-sm font-medium text-gray-900">
                                                            {`${user.firstName} ${user.lastName}`.trim()}
                                                        </h3>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-4 text-gray-500">
                                                {searchQuery.length >= 3 ? "No users found" : "Type at least 3 characters to search"}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MessageApp