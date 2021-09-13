Requirements: npm/yarn 

------------

### Getting started with Lezer SnowSQL:

Clone lezer-snowsql

Cd to lezer-snowsql after cloning.

Run `npm install` or  `yarn install` to install the dependencies.

Run `npm run build` or `yarn run build` to build lezer-snowsql.

Run `npm start` or `yarn start` to start it.

--------------


### Structure:

* The statement definitions are present in the snowsql.grammar file, inside src/ directory. 

* The second file in src/, tokens.js file contains the keywords used in snowsql.grammar.

Rules are made up of terms. A term can mean non-terminals and tokens. Non-terminals contain terms, so can contain both non-terminals and tokens. Tokens match a piece of text.

Rule/Non-terminal definition names should begin with a capital letter and have no spaces in-between.

Symbols and their purpose:

?: Specifies one optional occurrence of the term it is placed after.  
*: Specifies 0 or more occurrences of the term it is placed after.  
+: Specifies or more occurrences of the term it is placed after.  
|: Specifies alternative/or for a term.  

--------------

### Adding statements to the grammar: 

* In the grammar, we have an Stmt rule, which is the parent rule for all the statements. So for every new statement defined, this is the rule where the name of the rule should be added. E.g.

```
Stmt 
{ 
  .
  .
  .  
  DescribeStmt |
  DropStmt |
  NewStmt
  
}
```


In a SnowSQL statement, there will be a variety of keywords being used, we’ll need to add these keyword tokens into three sections between the grammar and the tokens file, like below:

In snowsql.grammar:

```
@external specialize {Identifier} specializeIdentifier from "./tokens" {
  .
  .
  .
  Select, From, Where, With, NewKeyword
  
}
```


In tokens.js:

First in: 
```
import {
  .
  .
  .
  Select,
  From,
  Where,
  With,
  NewKeyword

} from "./parser.terms.js";
```
And then in:
```
const keywordTokens = {
  .
  .
  .
  select : Select,
  from : From,
  where : Where,
  with: With,
  NewKeyword : NewKeyword
  
};
```


* Now, let us look at an actual statement. We’ll go with the Describe statement. 

```

DescribeStmt {
  
  (Describe | Desc) DescribeTargetSimple ObjName |

  (Describe | Desc) (External)? Table ObjName (Type Eql (Columns | Stage))? |

  (Describe | Desc) (Function | Procedure) Identifier UdfSig 

}


DescribeTargetSimple {

  Materialized? View |
  User |
  (Masking | Network | Row Access) Policy |
  File Format |
  (Api | Storage | Security | Notification)? Integration |
  Pipe |
  Sequence |
  Share |
  Stage |
  Stream |
  Task 

}
```


* We can have Describe or Desc at the beginning of the statement. So we’ll use the OR symbol (“|”) to have a choice between Desc and Describe.

* `DescribeTargetSimple` is a non-terminal that has terminals (or keywords) like Stream, Task, Stage etc.

We’ve clubbed all of the keywords that fit the identical definition, so we don’t have to write a separate Describe definition for each keyword.

In the second Describe definition you have 

```  (Describe | Desc) (External)? Table ObjName (Type Eql (Columns | Stage))? |```

Where external is optional, because of the ‘?’ symbol. 

The statement ends with a semicolon that is present in the top Stmts definition. The semicolon is a symbol added in the list present after //operator.  Like ``` Smc {";"}```, other symbols can be added.

After you’re done writing the statement, you should run

```npm run build``` 

If there are no errors, you’ve successfully added the statement.

--------------

### Errors you may encounter :

* Shift/Reduce:

A shift/reduce conflict occurs when both the shift and reduce actions are valid and the parser doesn’t know which one to continue with.

Besides the structural changes to avoid ambiguity, you can also add precedences for the problematic tokens. More on precedences in the Lezer docs

* Reduce/Reduce:

A reduce/reduce conflict occurs if there are two or more rules that apply to the same sequence of input. This usually means a serious error in the grammar.

To solve this, you’ll have to fix the rule definitions such that an input can only be reduced “in one way” with the definitions. 

**[Note : Both of the above errors can be isolated by not using the problematic rules/commenting them out. You can continue with adding different parts of the grammar]**
 
* Grammar contains zero-length tokens in (“<Rule_name_here>’'):

As the description suggests, there are zero-length tokens present in the rule. Which usually means an extra “|” symbol, placed accidentally. E.g. 
```
RuleDefintion { 

  TokenA | TokenB | | Token C

}
```
* Duplicate definition of rule (“<Rule_name_here>"):

There are two identical rule names in the grammar, the rule body can differ.
```
RuleDefintion { 

…

}


RuleDefintion { 

…

}
```
