import { Meteor } from "meteor/meteor";
import { TasksCollection } from "/imports/db/TasksCollection";

Meteor.publish("tasks", function publishTasks() {
  return TasksCollection.find({ userId: this.userId });
});

Meteor.publish("tasks2", function publishTasks() {
  return TasksCollection.find({});
});

// Funciona para listar todos as tarefas para usuário logado e apenas não pessoias para os demais
/* Meteor.publish("buscatarefas", function publishTasks() {
  return  TasksCollection.find({
    $or:
    [
      {userId: this.userId},
      {$and:
        [
          {userId:{$not:{$eq:this.userId}}},
          {isPessoal: false}
        ]}
    ]
    
    
    
    })
  }); */

Meteor.publish("tasks3", function publishTasks(checked, text) {
  console.log("NO SERVIDOR");
  console.log("valor checked" + checked);
  console.log("valor texto: " + text);

  if (checked && text !== "") {
    console.log("1");
    return TasksCollection.find({
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
    });
  }
  if (checked && text === "") {
    console.log("2");

    return TasksCollection.find({
      $or: [
        { userId: this.userId },
        {
          $and: [
            { userId: { $not: { $eq: this.userId } } },
            { isPessoal: false },
          ],
        },
      ],
    });
  }
  console.log("sem checked");
  if (!checked && text !== "") {
    console.log("3");

    return TasksCollection.find({
      $or: [
        {
          $and: [
            { userId: this.userId },
            { text: text },
            { $or: [{ situacao: "cadastrada" }, { situacao: "andamento" }] },
          ],
        },
        {
          $and: [
            { userId: { $not: { $eq: this.userId } } },
            { text: text },
            { isPessoal: false },
            { $or: [{ situacao: "cadastrada" }, { situacao: "andamento" }] },
          ],
        },
      ],
    });
  }

  if (!checked && text === "") {
    console.log("4");

    return TasksCollection.find({
      $or: [
        {
          $and: [
            { userId: this.userId },
            { $or: [{ situacao: "cadastrada" }, { situacao: "andamento" }] },
          ],
        },
        {
          $and: [
            { userId: { $not: { $eq: this.userId } } },
            { isPessoal: false },
            { $or: [{ situacao: "cadastrada" }, { situacao: "andamento" }] },
          ],
        },
      ],
    });
  }
});


Meteor.publish("userData", function () {
  if (Meteor.userId()) {
    return Meteor.users.find({ _id: Meteor.userId() });
  } else {
    console.log("ERRO");
  }
});
