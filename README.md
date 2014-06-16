AuthorSign
==========

Launch:

`nodejs server_as.js`

Expect this:

`Server listening at port 3000`

`Database processed into array. Number of lines: 24920`

Then you can go URL:

*http://localhost:3000/az?surname=`insert author's surname here`*

Example:

[click here](http://localhost:3000/az?surname=%D0%90%D0%BD%D0%B8%D1%81%D0%B8%D0%BC%D0%BE%D0%B2)

If you wrote correct surname, you'll get something like this:

`{"surname":"анисимов", "az": "А67" }`

Else, if you wrote surname of incorrect type, you will get

`{"error":"invalid type of surname"}`

Else, if you hadn't written surname at all, you'll absolutely get

`{"error":"no surname in request"}`

Have fun!
