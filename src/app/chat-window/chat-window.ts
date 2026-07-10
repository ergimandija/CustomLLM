import { Component, inputBinding, createComponent, viewChild } from '@angular/core';
import { ApiService } from '../api-service';
import { FormsModule } from '@angular/forms';
import { ChatBubble } from '../chat-bubble/chat-bubble';
import { ViewContainerRef } from '@angular/core';
@Component({
  selector: 'app-chat-window',
  imports: [FormsModule, ChatBubble],
  templateUrl: './chat-window.html',
  styleUrl: './chat-window.css',
})
export class ChatWindow {
    currentMessage = '';
    private messageContainer = viewChild.required('container', { read: ViewContainerRef });;
    constructor(private apiService: ApiService){
    }

   

    recieveMessage(message: string){
    
    }

    sendMessage(){
      this.createElement(this.currentMessage,true);
      console.log("sending...");
      //this.apiService.sendMessage(this.currentMessage);
    }

    private createElement(message:string, isUser: boolean){
      const element  = this.messageContainer().createComponent(ChatBubble);
      element.setInput('message', message);
      element.setInput('isUser', isUser);
    }

}
