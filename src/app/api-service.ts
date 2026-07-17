import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
    
    private apiUrl:string =  "http://localhost:11434/api/chat";
    private httpClient:HttpClient = inject(HttpClient);
    constructor(){} 

    sendMessage(message:string , temperature:number = 0.8): Observable<any> {
      console.log("Sending message to API:", message, "with temperature:", temperature);
        return this.httpClient.post<any>(this.apiUrl, {
          "model": "Liskov:latest",
          "messages": [
            {
              "role": "user",
              "content": message
            }
            
          ],
          "stream": false,
          "options": {
            "temperature": temperature
          }
        });

    }

    

    


}
