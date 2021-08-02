import React from "react";

// Component
import { toast, Toaster } from "react-hot-toast";

const Index = () => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const email = formData.get("email").toString();
        const message = formData.get("message").toString();

        if (!email) return toast.error("Email missing");
        else if (!message) return toast.error("Message missing");

        try {
            const fetching = await fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    message,
                }),
            });

            const data = await fetching.json();

            console.log(data);
        } catch (e) {
            console.log(e);
            console.log("handleSubmit() Error");
        }
    };

    return (
        <>
            <Toaster />
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Email" name="email" />
                <textarea placeholder="Message" name="message"></textarea>

                <button>Send</button>
            </form>
        </>
    );
};

export default Index;
