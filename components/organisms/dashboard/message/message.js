"use client"

import {useState} from "react"
import {FiSearch, FiMoreVertical, FiSend, FiVideo, FiCalendar, FiEdit, FiPlus, FiArrowLeft} from "react-icons/fi"
import {BsCircleFill} from "react-icons/bs"
import {useGetMessageList} from "@/apis/dashboard/message/getMessageList";
import MessagingSkeleton from "@/components/organisms/dashboard/message/message-skeleton";
import { format, isToday } from 'date-fns';

const MessageApp = () => {
    const { data, loading } = useGetMessageList();

    const [message, setMessage] = useState("")
    const [showChat, setShowChat] = useState(false)
    const [selectedConversation, setSelectedConversation] = useState(null)
    const [selectedMessages, setSelectedMessages] = useState([])

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
    const transformedConversations = data ? data.map(item => {
        const user = item.userVO;
        // get the most recent message
        const lastMessage = item.userMessageVOS.length ?
            item.userMessageVOS[item.userMessageVOS.length - 1] : null;

        return {
            id: user.id,
            name: `${user.firstName} ${user.lastName}`.trim(),
            message: lastMessage ? lastMessage.content : "",
            time: lastMessage ? getShortTime(lastMessage.sentAt) : "",
            online: false,
            unread: lastMessage ? !lastMessage.isRead : false,
            avatar: "/placeholder.svg?height=40&width=40",
            messages: item.userMessageVOS.map(msg => ({
                id: msg.id,
                sender: msg.sender.id === user.id ? "tutor" : "user",
                text: msg.content,
                time: formatMessageTime(msg.sentAt),
                fullTime: msg.sentAt
            }))
        };
    }) : [];

    const handleSendMessage = () => {
        if (message.trim() && selectedConversation) {
            // In a real application, you would call an API to send the message
            // For now, we'll just add it to the UI
            const newMessage = {
                id: Date.now(), // Temporary ID
                sender: "user",
                text: message,
                time: formatMessageTime(new Date()),
                fullTime: new Date().toISOString()
            };

            // Find and update the selected conversation
            const updatedConversations = transformedConversations.map(conv => {
                if (conv.id === selectedConversation) {
                    return {
                        ...conv,
                        messages: [...conv.messages, newMessage],
                        message: message, // Update the preview
                        time: "just now"
                    };
                }
                return conv;
            });

            // Update selected messages
            setSelectedMessages([...selectedMessages, newMessage]);
            setMessage("");

            // Here you would typically call an API to save the message
            // sendMessageAPI(selectedConversation, message);
        }
    }

    const handleConversationClick = (id) => {
        const selected = transformedConversations.find(conv => conv.id === id);
        if (selected) {
            setSelectedConversation(id);
            setSelectedMessages(selected.messages || []);
            setShowChat(true);
        }
    }

    const handleBackToList = () => {
        setShowChat(false);
    }

    if (loading || data === null) {
        return <MessagingSkeleton />
    }

    // Get the selected conversation data
    const selectedConversationData = transformedConversations.find(
        conv => conv.id === selectedConversation
    ) || (transformedConversations.length > 0 ? transformedConversations[0] : null);

    // If no conversation is selected yet and we have conversations, select the first one
    if (!selectedConversation && transformedConversations.length > 0 && !showChat) {
        handleConversationClick(transformedConversations[0].id);
    }

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
                            <button className="text-[#FF6636] flex items-center text-sm">
                                <FiPlus className="mr-1"/> Compose
                            </button>
                        </div>
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-3 text-gray-400"/>
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-[#FF6636]"
                            />
                        </div>
                    </div>

                    <div className="overflow-y-auto" style={{height: "calc(80vh - 120px)"}}>
                        {transformedConversations.map((conversation) => (
                            <div
                                key={conversation.id}
                                className={`flex items-start p-3 hover:bg-gray-50 cursor-pointer ${conversation.id === selectedConversation ? "bg-orange-100" : ""}`}
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
                                        <h3 className="text-sm font-medium text-gray-900">{conversation.name}</h3>
                                        <span className="text-xs text-gray-500">{conversation.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 truncate">{conversation.message}</p>
                                </div>
                                {conversation.unread && (
                                    <span className="ml-2 mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-red-500"></span>
                                )}
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
                <div className={`flex-1 flex flex-col ${!showChat ? "hidden md:flex" : "flex"}`}>
                    {/* Chat header */}
                    {selectedConversationData && (
                        <>
                            <div className="border-b border-gray-200 p-3 md:p-4 flex items-center">
                                <button onClick={handleBackToList} className="mr-2 md:hidden text-gray-500">
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
                                        {/* You can add more user details here if available in the API */}
                                    </div>
                                </div>
                                <button className="text-gray-500 ml-2">
                                    <FiMoreVertical/>
                                </button>
                            </div>

                            {/* Chat messages */}
                            <div className="flex-1 overflow-y-auto p-3 md:p-4 bg-gray-50">
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
                                                                <div className="bg-orange-50 rounded-lg p-2 md:p-3">
                                                                    <p className="text-xs md:text-sm">{msg.text}</p>
                                                                    <div className="text-xs text-gray-500 mt-1 text-right">{msg.time}</div>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {msg.sender === "user" && (
                                                            <div className={`bg-orange-500 text-white rounded-lg p-2 md:p-3 max-w-[90%] md:max-w-[80%]`}>
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

                            {/* Action buttons */}
                            <div className="border-t border-gray-200 p-2 md:p-3 overflow-x-auto">
                                <div className="flex gap-2 md:flex-wrap">
                                    <button className="border border-orange-500 text-orange-500 rounded-md px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm whitespace-nowrap flex items-center">
                                        <FiVideo className="mr-1"/> Video Call
                                    </button>
                                    <button className="border border-orange-500 text-orange-500 rounded-md px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm whitespace-nowrap flex items-center">
                                        <FiEdit className="mr-1"/> Book Trial
                                    </button>
                                    <button className="border border-orange-500 text-orange-500 rounded-md px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm whitespace-nowrap flex items-center">
                                        <FiCalendar className="mr-1"/> View Schedule
                                    </button>
                                    <button className="border border-orange-500 text-orange-500 rounded-md px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm whitespace-nowrap">
                                        Learn More
                                    </button>
                                </div>
                            </div>

                            {/* Message input */}
                            <div className="border-t border-gray-200 p-2 md:p-3 flex items-center">
                                <FiEdit className="text-orange-500 mr-2 flex-shrink-0"/>
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Type your message"
                                    className="flex-1 border-0 focus:ring-0 focus:outline-none text-sm"
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="bg-orange-500 text-white rounded-md px-3 md:px-4 py-1 md:py-2 flex items-center text-xs md:text-sm flex-shrink-0"
                                >
                                    Send <FiSend className="ml-1 md:ml-2"/>
                                </button>
                            </div>
                        </>
                    )}
                    {!selectedConversationData && (
                        <div className="flex-1 flex items-center justify-center text-gray-500">
                            Select a conversation or start a new one
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MessageApp