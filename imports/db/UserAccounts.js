import { Mongo } from 'meteor/mongo';
import React from "react";
import { Accounts } from 'meteor/accounts-base';




export const UserAccounts = (username, passoword) => {
    console.log('UserAccounts  para cria juliana erro');
    if (!Accounts.findUserByUsername(username)) {
        Accounts.createUser({
          username: 'juliana',
          password: '123',
        }, (e)=>{
            console.log('entrou erro');
            console.log(e);
        });
      }
      
}


