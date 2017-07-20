// Download the Node helper library from twilio.com/docs/node/install
//This snipped is based on the latest node library for twilio, so install the next gen version .
//For Example : You can do this by doing  “  sudo npm install twilio@3.0.0-rc.15 -g —save "


//Also download alasql and json2csv packages
//You can do this by doing  “  sudo npm install alasql -g —save "
//You can do this by doing  “  sudo npm install json2csv -g —save "

// These vars are your accountSid and authToken from twilio.com/user/account
var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken =  process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);
const alasql = require("alasql")
const psv    = require("json2csv");


function getSummary()
{
console.log('******************************* SUMMARY *****************************************************');
console.log('account|cost_unit|total_cost');
var headerFields = ['account','cost_unit','total_cost'];
client.api.accounts.list()
  .then(function(data)  
       {
           return data.forEach(function(account) 
             {
               //console.log(account.dateCreated + '|' + account.friendlyName + '|' + account.sid);
               var subaccountClient = require('twilio')(account.sid,account.authToken);

               subaccountClient.api.usage.records
                               .allTime
                               .list()
                               .then(function(usageRecs)
                                    {
                                       accountLevelUsageRecs = usageRecs ;
                                       sqlStatement='SELECT \"'+ account.friendlyName + ':\"  ||  accountSid as account,priceUnit as cost_unit, sum(price) total_cost  from ?';
                                       sqlStatement=sqlStatement+'group by \"'+ account.friendlyName + ':\"  ||  accountSid,priceUnit';
                                      //console.log(sqlStatement);
                                       var res = alasql(sqlStatement,[accountLevelUsageRecs]);
                                       //console.log(res);
                                       var psvSummary = psv({ data: res, fields: headerFields , del: '|' , hasCSVColumnTitle : false , pretty:true});
                                       console.log(psvSummary);

                                     });

              });
       });

}


function getDetails()
{
console.log('******************************* DETAILS *****************************************************');
console.log('friendlyName|account_sid|usageRec_description|usageRec_usage|usageRec_usageUnit|usageRec_price|usageRec_priceUnit');
client.api.accounts.list()
  .then(function(data)
       {
           return data.forEach(function(account)
             {
               //console.log(account.dateCreated + '|' + account.friendlyName + '|' + account.sid);
               var subaccountClient = require('twilio')(account.sid,account.authToken);

               subaccountClient.api.usage.records
                               .allTime
                               .each(
                                     function(usageRec)
                                        {
                                          console.log(account.friendlyName + '|' + account.sid + '|' + usageRec.description  + '|' 
                                                      + usageRec.usage + '|' + usageRec.usageUnit + '|' + usageRec.price + '|' + usageRec.priceUnit);
                                        }
                                     );
              });
       });



}





if (accountSid === "" || authToken === "")
{
     exit(0);
}
else
{

    if (process.argv.length === 3)
       {
          var choice=process.argv[2];
          if (choice === 'D' )
            {
               getDetails();
            }
          if (choice === 'S' )
            {
              getSummary();
            }
        } 
    else
        {
           {
               getSummary();
           }
        } 

}
