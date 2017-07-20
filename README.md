# UsagesByTwilioAccount
Standalone script to generate a usages for all subaccounts under an account , summaries at Account or Account/Usage Type level


----------


 

#### <i class="icon-cog"></i> Installation

Install following packages from npm

```
sudo npm install twilio@3.0.0-rc.15 -g —save 
sudo npm install alasql -g —save 
sudo npm install json2csv -g —save

```

Set your Twilio Account SID and Auth Token in the following environment Variables (bash example below)

```
export TWILIO_ACCOUNT_SID=ACcsfdsarereadsf2423eds
export TWILIO_AUTH_TOKEN=avdsaf98324jlekrwr
```

----------

#### <i class="icon-refresh"></i> Usage 


View                                          | Usage
--------------------------------------------  | -----------------------------------
Summary by Subaccount                         | node getUsageBySubAccount.js "S"
Details summarised by Subaccount/UsageType    | node getUsageBySubAccount.js "D"



----------

#### <i class="icon-file"></i> Sample Output - Summary by Account/Subaccount

```
node getUsageBySubAccount.js "S" > summary.output.txt
******************************* SUMMARY *****************************************************
account|cost_unit|total_cost
"forZapier:AC2fxxxxxxxxxxx"|"usd"|24.569999999999997
"notifyDemo:AC11yyyyyyyyyyyyyyy"|"usd"|0
"connectDemo:AC58zzzzzzzzzzzzz"|"usd"|0
"Subaccount for ConnectApp: tryConnect:ACf4af0sssssssssssssss"|"usd"|0
"Custdemos:AC256999999999999994llllllllll"|"usd"|537.1518399999999
"callTrackingDemo:AC0f62cbddddddddddddde"|"usd"|12.030000000000001
"copilotDemo:AC8d0f0c727dsalfkdsakfsafasdf"|"usd"|61.662000000000006
"amehta@twilio.com's Account:AC83233efslkxclksdalkfsdafa665"|"usd"|3434.861209999999
"myPersonalNumbers:AC688345rsdjlslsdssdsdssd"|"usd"|508.1184899999999
```

#### <i class="icon-file"></i> Sample Output - Summary by Account/Subaccount/Usage Type

```
node getUsageBySubAccount.js "D" > detailed.output.txt

******************************* DETAILS *****************************************************
Subaccount for ConnectApp: tryConnect|ACf4af0sssssssssssssss|Inbound Mobile Calls|0|minutes|0|usd
Subaccount for ConnectApp: tryConnect|ACf4af0sssssssssssssss|Room Participants SG1|0|participants|0|usd
Subaccount for ConnectApp: tryConnect|ACf4af0sssssssssssssss|Marketplace|0|units|0|usd
Subaccount for ConnectApp: tryConnect|ACf4af0sssssssssssssss|SIM Starter Pack|0|units|0|usd
notifyDemo|AC11yyyyyyyyyyyyyyy|TURN Megabytes Singapore|0|megabytes|0|usd
notifyDemo|AC11yyyyyyyyyyyyyyy|Customer Owned ShortCodes|0|shortcodes|0|usd
notifyDemo|AC11yyyyyyyyyyyyyyy|Trunking Origination Local Calls|0|minutes|0|usd
notifyDemo|AC11yyyyyyyyyyyyyyy|Programmable Chat Users|0|use|0|usd
amehta@twilio.com's Account|AC83233efslkxclksdalkfsdafa665|Lookups|26816|lookups|25.21|usd
```

----------
#### <i class="icon-folder-open"></i> Reference
> - [Twilio REST API: Accounts](https://www.twilio.com/docs/api/rest/account)
> - [Twilio REST API: Subaccounts](https://www.twilio.com/docs/api/rest/subaccounts)
> - [Twilio REST API: Usage Records](https://www.twilio.com/docs/api/rest/usage-records)
>     - [Usage Record Accumulation Tiers](https://www.twilio.com/docs/api/rest/usage-records#list-subresources)


>Note
>- This currently retrieves all time usages under the account/subaccount.Can be easily tweaked to do on daily,monthly,date range 
>- TBD : Take as option the accumulation level ( daily/monthly/date range etc) 

