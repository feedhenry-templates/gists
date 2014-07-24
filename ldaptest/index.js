var args = require('optimist')
  .demand('u').alias('u', 'user').describe('u', 'User DN - e.g. cn=Patricia Thompson,ou=users,o=nrtest')
  .demand('p').alias('p', 'password').describe('p', 'password')
  .demand('l').alias('l', 'ldap').describe('l', 'ldap server - e.g. ldap://127.0.0.1:1389')
  .argv;

var user = args.user;
var pass = args.password;
var ldapserver = args.ldap;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Node v0.10.x requires SSL certs to match otherwise

var ldap = require('ldapjs');
var client = ldap.createClient({
  url: ldapserver
});



client.bind(user, pass, function(err) {
  if(!err) {
    console.log('Successful');
  } else {
    console.log("failed: err: ", err.message);
    console.log("err: " + JSON.stringify(err));
    process.exit(1);
  }

  var opts = {
    filter: '(userPrincipalName=fred@flintstones.com)',
    scope: 'sub'
  };

  // client.del('CN=Martin Murphy,CN=LDAPtest,DC=feedhenry,DC=com', function(err) {
  //   console.log('err:', err);
  // });

  client.search('CN=LDAPtest,DC=feedhenry,DC=com', opts, function(err, res) {
    if (err) console.error(err);
    console.log('res:', res);

    res.on('searchEntry', function(entry) {
      //console.log('entry: ' + JSON.stringify(entry.object));
      console.log(entry.object.comment);
      var services = JSON.parse(entry.object.comment);
      console.log(services.services.salesforce);

    });
    res.on('searchReference', function(referral) {
      console.log('referral: ' + referral.uris.join());
    });
    res.on('error', function(err) {
      console.error('error: ' + err.message);
    });
    res.on('end', function(result) {
      console.log('status: ' + result.status);
    });
  });


  // client.unbind(function(err) {
  //   if(!err) {
  //     console.log('Disconnected');
  //   } else {
  //     console.log("failed: to disconnet: ", (err.message)?err.message:"no Error message");
  //     console.log("err: " + JSON.stringify(err));
  //   }
  // });
});
