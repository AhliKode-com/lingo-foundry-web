"use client"

import {useState} from "react"
import {FiSearch, FiMoreVertical, FiSend, FiVideo, FiCalendar, FiEdit, FiPlus, FiArrowLeft} from "react-icons/fi"
import {BsCircleFill} from "react-icons/bs"

const MessageApp = () => {
    const [message, setMessage] = useState("")
    const [showChat, setShowChat] = useState(false)
    const [selectedConversation, setSelectedConversation] = useState(1)

    const conversations = [
        {
            id: 1,
            name: "Jane Cooper",
            message: "Yeah sure, tell me zafor",
            time: "just now",
            online: true,
            avatar: "/placeholder.svg?height=40&width=40",
        },
        {
            id: 2,
            name: "Jenny Wilson",
            message: "Thank you so much, sir",
            time: "2 d",
            online: false,
            unread: true,
            avatar: "/placeholder.svg?height=40&width=40",
        },
        {
            id: 3,
            name: "Marvin McKinney",
            message: "You're Welcome",
            time: "1 m",
            online: true,
            unread: true,
            avatar: "/placeholder.svg?height=40&width=40",
        },
        {
            id: 4,
            name: "Eleanor Pena",
            message: "Thank you so much, sir",
            time: "1 m",
            online: false,
            avatar: "/placeholder.svg?height=40&width=40",
        },
        {
            id: 5,
            name: "Ronald Richards",
            message: "Sorry, I can't help you",
            time: "2 m",
            online: true,
            avatar: "/placeholder.svg?height=40&width=40",
        },
        {
            id: 6,
            name: "Kathryn Murphy",
            message: "new message",
            time: "2 m",
            online: false,
            avatar: "/placeholder.svg?height=40&width=40",
        },
        {
            id: 7,
            name: "Jacob Jones",
            message: "Thank you so much, sir",
            time: "6 m",
            online: true,
            avatar: "/placeholder.svg?height=40&width=40",
        },
        {
            id: 8,
            name: "Cameron Williamson",
            message: "It's okay, no problem brother. i will fix everythin...",
            time: "6 m",
            online: false,
            avatar: "/placeholder.svg?height=40&width=40",
        },
        {
            id: 9,
            name: "Arlene McCoy",
            message: "Thank you so much, sir",
            time: "9 m",
            online: false,
            avatar: "/placeholder.svg?height=40&width=40",
        },
        {
            id: 10,
            name: "Dianne Russell",
            message: "You're Welcome",
            time: "9 m",
            online: true,
            avatar: "/placeholder.svg?height=40&width=40",
        },
    ]

    const messages = [
        {
            id: 1,
            sender: "tutor",
            text: "Hello and thanks for signing up to the course. If you have any questions about the course or Adobe XD, feel free to get in touch and I'll be happy to help 😊",
            time: "Today",
        },
        {id: 2, sender: "user", text: "Hello, Good Evening.", time: ""},
        {id: 3, sender: "user", text: "I'm Zafor", time: ""},
        {
            id: 4,
            sender: "user",
            text: "I only have a small doubt about your lecture, can you give me some time for this?",
            time: "",
        },
        {id: 5, sender: "tutor", text: "Yeah sure, tell me zafor", time: ""},
    ]

    const handleSendMessage = () => {
        if (message.trim()) {
            // Logic to send message would go here
            setMessage("")
        }
    }

    const handleConversationClick = (id) => {
        setSelectedConversation(id)
        setShowChat(true)
    }

    const handleBackToList = () => {
        setShowChat(false)
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
                            <button className="text-indigo-600 flex items-center text-sm">
                                <FiPlus className="mr-1"/> Compose
                            </button>
                        </div>
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-3 text-gray-400"/>
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            />
                        </div>
                    </div>

                    <div className="overflow-y-auto" style={{height: "calc(80vh - 120px)"}}>
                        {conversations.map((conversation) => (
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
                    </div>
                </div>

                {/* Right side - Chat area */}
                <div className={`flex-1 flex flex-col ${!showChat ? "hidden md:flex" : "flex"}`}>
                    {/* Chat header */}
                    <div className="border-b border-gray-200 p-3 md:p-4 flex items-center">
                        <button onClick={handleBackToList} className="mr-2 md:hidden text-gray-500">
                            <FiArrowLeft size={20}/>
                        </button>
                        <img
                            src="/placeholder.svg?height=50&width=50"
                            alt="Profile"
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full mr-2 md:mr-3"
                        />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center flex-wrap">
                                <span className="text-xs md:text-sm font-medium mr-1">❤️Alexandra</span>
                                <span className="text-xs md:text-sm mr-1">🌟6yrs Exp</span>
                                <span
                                    className="hidden md:inline text-xs md:text-sm mr-1">❤️Masters degree in TEFL</span>
                                <span className="hidden md:inline text-xs md:text-sm mr-1">🌟Speaking Expert</span>
                                <span className="hidden md:inline text-xs md:text-sm mr-1">❤️IELTS</span>
                                <span className="text-xs md:text-sm mr-1">🌟Kids & Adults</span>
                                <span className="hidden md:inline text-xs md:text-sm mr-1">❤️Fun and Patient</span>
                            </div>
                            <div className="text-xs text-orange-500 truncate">Trial Class Rp. 50.000 • 13,000+ Lessons
                            </div>
                        </div>
                        <button className="text-gray-500 ml-2">
                            <FiMoreVertical/>
                        </button>
                    </div>

                    {/* Chat messages */}
                    <div className="flex-1 overflow-y-auto p-3 md:p-4 bg-gray-50">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`mb-4 ${msg.sender === "user" ? "flex justify-end" : "flex justify-start"}`}
                            >
                                {msg.time &&
                                    <div className="text-xs text-center text-gray-500 my-2 w-full">{msg.time}</div>}
                                {msg.sender === "tutor" && (
                                    <div className="flex items-start max-w-[90%] md:max-w-[80%]">
                                        <div className="mr-2 mt-1">
                                            <img
                                                src="/placeholder.svg?height=30&width=30"
                                                alt="Tutor"
                                                className="w-6 h-6 md:w-8 md:h-8 rounded-full"
                                            />
                                            <div className="text-xs text-gray-500 mt-1">Time</div>
                                        </div>
                                        <div className="bg-orange-50 rounded-lg p-2 md:p-3">
                                            <p className="text-xs md:text-sm">{msg.text}</p>
                                        </div>
                                    </div>
                                )}
                                {msg.sender === "user" && (
                                    <div
                                        className={`bg-orange-500 text-white rounded-lg p-2 md:p-3 max-w-[90%] md:max-w-[80%]`}>
                                        <p className="text-xs md:text-sm">{msg.text}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="text-xs text-right text-gray-500 mb-4">Time</div>
                    </div>

                    {/* Action buttons */}
                    <div className="border-t border-gray-200 p-2 md:p-3 overflow-x-auto">
                        <div className="flex gap-2 md:flex-wrap">
                            <button
                                className="border border-orange-500 text-orange-500 rounded-md px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm whitespace-nowrap flex items-center">
                                <FiVideo className="mr-1"/> Video Call
                            </button>
                            <button
                                className="border border-orange-500 text-orange-500 rounded-md px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm whitespace-nowrap flex items-center">
                                <FiEdit className="mr-1"/> Book Trial
                            </button>
                            <button
                                className="border border-orange-500 text-orange-500 rounded-md px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm whitespace-nowrap flex items-center">
                                <FiCalendar className="mr-1"/> View Schedule
                            </button>
                            <button
                                className="border border-orange-500 text-orange-500 rounded-md px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm whitespace-nowrap">
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
                        />
                        <button
                            onClick={handleSendMessage}
                            className="bg-orange-500 text-white rounded-md px-3 md:px-4 py-1 md:py-2 flex items-center text-xs md:text-sm flex-shrink-0"
                        >
                            Send <FiSend className="ml-1 md:ml-2"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MessageApp

