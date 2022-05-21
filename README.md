Front-backend app

Allows to add, delete, list object atributes, find objects

Reads json file, sends json object to react in which we can list in this case all cats, add new cat
that is passed trough POST method to node in where we save that new cat in existing json also we can
delete any cat from json file with same method i take info from client side on which cat we wanna delete
and send that info to server side(node) where we remove that cat from json object and than we save that in json.

For this to run u will need:

1. node-modules for react(in react file)
	 -npx create-react-app .

2. node-modules for node(express.js)(in node file)
	 -npm i express

3. nodemon for server automatically update(in node file)
	 -npm i nodemon -D

4. axios for POST request(in react file)
	 -npm install axios

5. cors to allow react to send data to node(in node file)
	 -npm install cors

6. To run node server
	 -npm run dev

7. To run react
	 -npm start

