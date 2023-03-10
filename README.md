# ENGLISH

The API created with Node, Express, and MySql allows users to manage their daily routines and tasks efficiently and organizedly. When a user logs into the system, the user settings screen is presented. From there, the user can create a new daily routine, which is added to the Routines table, related to the logged-in user.

The user can add tasks to the created routine, which are added to the Tasks table, related to the specific routine. The next day, when the user accesses the daily routine screen, the system presents all the tasks of the daily routine in checkbox form. The user can then mark the completed tasks, and the system updates the status of the tasks in the Tasks table.

After marking the completed tasks, the user can save the daily routine of the day. The system adds the daily routine to the Routines table, related to the original routine and marking the tasks as completed. The user can repeat this process every day to update their daily routine with completed tasks.

The API includes endpoints to handle client HTTP requests, such as endpoint POST for user login, endpoint GET for the user settings screen, endpoint POST to create a new daily routine, endpoint POST to add tasks to a routine, endpoint GET for the daily routine screen, endpoint PUT to update the status of a task, endpoint POST to save the daily routine of the day, and endpoint GET to view previous daily routines.


# PORTUGUESE 

A API criada com Node, Express e MySql permite aos usuários gerenciarem suas rotinas diárias e tarefas de maneira eficiente e organizada. Quando um usuário faz login no sistema, é apresentada a tela de configurações do usuário. A partir daí, o usuário pode criar uma nova rotina diária, que é adicionada na tabela de Rotinas, relacionando-a com o usuário logado.

O usuário pode adicionar tarefas à rotina criada, que são adicionadas à tabela de Tarefas, relacionando-as com a rotina específica. No dia seguinte, quando o usuário acessa a tela de rotina diária, o sistema apresenta todas as tarefas da rotina diária em forma de checkboxes. O usuário pode então marcar as tarefas que foram concluídas e o sistema atualiza o status das tarefas na tabela de Tarefas.

Após marcar as tarefas concluídas, o usuário pode salvar a rotina diária do dia. O sistema adiciona a rotina diária na tabela de Rotinas, relacionando-a com a rotina original e marcando as tarefas como concluídas. O usuário pode repetir esse processo a cada dia para atualizar sua rotina diária com as tarefas concluídas.

A API inclui endpoints para lidar com as requisições HTTP do cliente, como endpoint POST para o login do usuário, endpoint GET para a tela de configurações do usuário, endpoint POST para criar uma nova rotina diária, endpoint POST para adicionar tarefas a uma rotina, endpoint GET para a tela de rotina diária, endpoint PUT para atualizar o status de uma tarefa, endpoint POST para salvar a rotina diária do dia e endpoint GET para visualizar as rotinas diárias anteriores.