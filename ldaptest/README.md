ldaptest
========

LDAP Tester

Test authentication against an LDAP server

Examples
- node index.js -u 'fhtest' -p 'secretPassword' -l 'ldaps://127.0.0.1:1636'
- node index.js -u 'fhtest@valueretail.com' -p 'secretPassword' -l 'ldaps://127.0.0.1:1636'  
- node index.js -u 'CN=fhtest,OU=test user accounts,OU=users,OU=My Company,DC=mydept,DC=com' -p 'secretPassword' -l 'ldaps://127.0.0.1:1636'
    
