Requirements: npm/yarn 

------------

Steps to start with CodeMirror PromQL and Lezer PromQL. 

Clone codemirror-promql

Cd to codemirror-promql after cloning.

Run `npm install` to install dependencies.

Run `npm run build` to build codemirror-promql.

Run `npm start` to start it.

The same steps can be repeated with CodeMirror SnowSQL and Lezer PromQL. Currently please clone the WIP branches for both repos. 

codemirror-snowsql-wip and lezer-snowsql-wip
--------------

Adding queries to the grammar: 

* Clone lezer-promql or  lezer-snowsql-wip

* Go to the .grammar file which is in the scr directory. 

* In the file find a construct named as Expr. The promql linter and parser treats this as the parent node so we have not yet renamed it. 
In this you will find “Stmt”. This is the parent node for all the statements we are constructing. This is the list of expressions that are supported by the 
grammar. Also please note that the ‘|’ symbol represents ‘or’. 

* You will be able to see a list with the name of stmt a lillte below the expr list. This is where you need to add the sql statement construct you wish to support. 
For example, the first construct in the list is “SelectStmt” which supports the logic for a basic select statement. 

* Now if you scroll down you will find “SelectStmt” again this is where the logic for the select statement is defined. 

Let us break down the statement. 





SelectStmt is the name we have given to the construct that will define the select statement logic. 
Construct names must begin in capital letters and have no space between them. 

Now that we have added SelectStmt to the Stmt list we can define the logic in SelectStmt. 

After the Expr list you write the following code:
```
SelectStmt{
  Select  (Mul  | ((Identifier)(Comma Identifier)*))  
  From  Identifier  (Where WhereOp)? Smc 
}
```
This code defines the logic for the select statement.

Select is the first keyword followed by a whitespace after that the brack open and the ‘|’ says that the user can choose to either write a mul(*) or write an 
identifier(which represents a column name here). 

The identifier keyword says that there must be at least one column name given if mul is not chosen. Whenever a keyword is seen in an expression like that it will 
demand one occurrence of whatever the keyword defines. 
The comma and identifier specify that the user must input a comma next if there is more than one column name to be used. The star after the expression allows the 
user to add any number of columns to the first one. 

The rest of the keywords will demand one appearance of whatever their definition states. 

For example the definition of whitespace means that there must be one whitespace between from the table name. 

The statement ends with a semicolon required from the user. 

Identifier: `{ ((std.asciiLetter|std.digit | "_" | ":") (std.asciiLetter* | std.digit* | "_" | ":"|"@"|"/"|"+"|"-"|"*"|"/"|"^"|"("|")"|">"|"<"|"%"|".")*)  }`

This is the identifier definition. It states the identifier with either a digit or letter or an underscore or “:”. Then after that we can have as many repetitions 
as we wish of digits or letter or the symbols listed.  

The next step is to define the keywords we have used here. Mul Identifier and whitespace are already predefined. We need to add select from comma and semicolon. 

To add select and from go to this line: ‘@external specialize {Identifier} specializeIdentifier from “./tokens{ ‘

Now add select and from to this list. 

Now go to the line ‘ // operator’

Add the definition of comma to the list : ‘ comma{“,”} ‘
Also add ‘ smc{;} ‘

Subqueries (where clause)

You may notice the select statement has a construct “WhereOp”. This is due to the fact that usage of “?” (which represents one optional occurrence of the given 
construct) regex symbol. If this symbol is used too much in one query the compilation of the grammar will take a lot of time that is why it is better to delegate 
part of the query to a subquery construct. 

Subquery constructs are defined like normal query constructs only. The same process for a normal query construct is to be followed for a sub query construct. 

Add the changes in the terms files and all here. 

Now open terminal and cd to lezer snowsql master. Run the command ‘npm run build’ .

Your grammar should compile successfully. It will generate a set of files in the dist folder of lezer snowsql master. 

Go to codemirror-snowsql-master/node_modules/lezer-snowsql and replace all the files there with the files from lezer-snowsql-master/dist. 

------------


To handle errors with these expressions, for example, the select expression or select statement,
you will need to import ‘SelectStmt’ from ‘lezer-promql’.

Then, write a case for this SelectStmt, inside checkAST’s switch-case. 
Like below:

     case SelectStmt:
        this.checkSelect(node)
       break;

Then you’ll need to define the checkSelect function to handle specific error cases.

-----------

For syntax highlighting, you can add the tokens in the parser configuration inside `LezerLanguage.define`, which is present in the file promql.ts.

The highlight definitions for these tags, along with their colours are present in src/app/theme.ts

