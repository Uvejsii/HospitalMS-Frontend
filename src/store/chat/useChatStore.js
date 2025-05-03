import {defineStore} from "pinia";
import {ref} from "vue";

export const useChatStore = defineStore('chat', () => {
    const url = 'http://localhost:5233/Chat'
    const showChatSideBar = ref(false)
    const clickedUser = ref({})
    const chatMessages = ref([])
    const messageToSend = ref('')

    const getClickedUserToChat = (user) => {
        clickedUser.value = user
        showChatSideBar.value = true
    }

    const getChatMessages = async (senderId, receiverId) => {
        const res = await fetch(`${url}/GetMessages/${senderId}/${receiverId}`, {
            method: 'GET',
        })
        chatMessages.value = await res.json()
    }

    const sendMessage = async (senderId, receiverId, message) => {
        const res = await fetch(`${url}/SendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({senderId, receiverId, message }),
        })

        if (res.ok) {
            messageToSend.value = ''
        }
    }

    return {
        showChatSideBar,
        getClickedUserToChat,
        clickedUser,
        getChatMessages,
        chatMessages,
        sendMessage,
        messageToSend,
    }
})