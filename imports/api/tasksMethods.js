import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { TasksCollection } from "/imports/db/TasksCollection";

Meteor.methods({
  "tasks.insert"(text, descricao, isPessoal, username) {
    check(text, String);
    check(descricao, String);
    check(isPessoal, Boolean);
    check(username, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }
    TasksCollection.insert({
      text,
      descricao,
      situacao: "cadastrada",
      isPessoal: isPessoal,
      createdAt: new Date(),
      userId: this.userId,
      username: username.trim(),
    });
  },

  "tasks.update"(taskId, text, descricao, situacao, isPessoal) {
    check(taskId, String);
    check(text, String);
    check(descricao, String);
    check(situacao, String);
    check(isPessoal, Boolean);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    TasksCollection.update(
      { _id: taskId },
      {
        $set: {
          text: text.trim(),
          descricao: descricao.trim(),
          situacao: situacao.trim(),
          isPessoal: isPessoal,
        },
      }
    );
  },

  "tasks.remove"(taskId) {
    check(taskId, String);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    TasksCollection.remove(taskId);
  },

  "tasks.setIsChecked"(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    if (!this.userId) {
      throw new Meteor.Error("Not authorized.");
    }

    TasksCollection.update(taskId, {
      $set: {
        isChecked,
      },
    });
  },

  "tasks.list"(checked, text, skip, limit) {

    if (checked && text !== "") {
      return TasksCollection.find(
        {
          $or: [
            { $and: [{ userId: this.userId }, { text: text }] },
            {
              $and: [
                { userId: { $not: { $eq: this.userId } } },
                { isPessoal: false },
                { text: text },
              ],
            },
          ],
        },
        { skip: 4 * skip, limit: limit }
      ).fetch();
    }
    if (checked && text === "") {
      return TasksCollection.find(
        {
          $or: [
            { userId: this.userId },
            {
              $and: [
                { userId: { $not: { $eq: this.userId } } },
                { isPessoal: false },
              ],
            },
          ],
        },
        { skip: 4 * skip, limit: limit }
      ).fetch();
    }
    if (!checked && text !== "") {
      return TasksCollection.find(
        {
          $or: [
            {
              $and: [
                { userId: this.userId },
                { text: text },
                {
                  $or: [{ situacao: "cadastrada" }, { situacao: "andamento" }],
                },
              ],
            },
            {
              $and: [
                { userId: { $not: { $eq: this.userId } } },
                { text: text },
                { isPessoal: false },
                {
                  $or: [{ situacao: "cadastrada" }, { situacao: "andamento" }],
                },
              ],
            },
          ],
        },
        { skip: 4 * skip, limit: limit }
      ).fetch();
    }

    if (!checked && text === "") {
      return TasksCollection.find(
        {
          $or: [
            {
              $and: [
                { userId: this.userId },
                {
                  $or: [{ situacao: "cadastrada" }, { situacao: "andamento" }],
                },
              ],
            },
            {
              $and: [
                { userId: { $not: { $eq: this.userId } } },
                { isPessoal: false },
                {
                  $or: [{ situacao: "cadastrada" }, { situacao: "andamento" }],
                },
              ],
            },
          ],
        },
        { skip: 4 * skip, limit: limit }
      ).fetch();
    }
  },

  "user.create"(username, password, email, datanasc, empresa, sexo, image) {
    if (!Accounts.findUserByUsername(username)) {
      Accounts.createUser({
        username: username,
        password: password,
        email: email,
        profile: {
          datanasc: datanasc,
          empresa: empresa,
          sexo: sexo,
          image: image,
        },
      });
    }
  },
});
