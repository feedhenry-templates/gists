ldaptest
========

LDAP Tester

Test authentication against an LDAP server

Examples

```
node index.js -u 'fhtest' -p 'secretPassword' -l 'ldap://127.0.0.1:389'
node index.js -u 'fhtest@example.com' -p 'secretPassword' -l 'ldaps://127.0.0.1:636'  
node index.js -u 'CN=fhtest,OU=test user accounts,OU=users,OU=My Company,DC=mydept,DC=com' -p 'secretPassword' -l 'ldaps://127.0.0.1:636'
```    
