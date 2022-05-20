Front-backend app

Allows to add, list atributes, find elements

Reads json file, sends json object to react in which we can list in this case all cats, add new cat
that is passed trough POST method to node in where we save that new cat in existing json.

For this to run u will need:

1. node-modules for react(in react file)
	 -npx create-react-app .

2. node-modules for node(express.js)(in node file)
	 -npm i express

3. axios for POST request(in react file)
	 -npm install axios

4. cors to allow react to send data to node(in node file)
	 -npm install cors

5. To run node server
	 -npm run dev

6. To run react
	 -npm start


