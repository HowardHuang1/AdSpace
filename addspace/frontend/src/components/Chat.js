import React, { useState, useEffect, useRef } from "react";
import { Box, Text, VStack, Input, Button, Avatar } from "@chakra-ui/react";

const ChatMessage = ({ text, isUser }) => (
  <Box
    p={1}
    borderRadius="lg"
    bg={isUser ? "blue.200" : "gray.200"}
    alignSelf={isUser ? "flex-end" : "flex-start"}
    maxW="70%"
    wordBreak="break-word"
  >
    <Text fontSize="sm" color={isUser ? "white" : "black"}>
      {text}
    </Text>
  </Box>
);

const Chat = ({ messages, onSendMessage }) => {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendClick = () => {
    if (inputValue.trim() !== "") {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  useEffect(() => {
    // Scroll to the latest message when new messages are added
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <VStack spacing={4} p={4} w="100%" mx="auto">
      <Box
        style={{
          overflowY: "scroll",
          maxHeight: "300px",
          width: "100%",
        }}
      >
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            text={message.text}
            isUser={message.isUser}
          />
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <Box>
        <Input
          placeholder="Type your message..."
          value={inputValue}
          onChange={handleInputChange}
        />
        <Button onClick={handleSendClick} mt={2}>
          Send
        </Button>
      </Box>
      <div style={{ height: "1px", flexGrow: 1 }}></div>
    </VStack>
  );
};

export default Chat;