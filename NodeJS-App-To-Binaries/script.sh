clear
RED="\e[31m"
GREEN="\e[32m"
YELLOW="\e[33m"
MAGENTA="\e[35m"
CYAN="\e[36m"
RESET="\e[0m"
ENDCOLOR="\e[0m"
bold=$(tput bold)
pwd=$(pwd)
echo -e "${YELLOW} *******************************${ENDCOLOR}"
echo -e "${GREEN}${bold} Welcome to WatchDog Monitor Tool${ENDCOLOR}"
echo -e "${YELLOW} *******************************${ENDCOLOR}"
echo -e "\n"

echo -e "${GREEN} Installing NPM Packages${ENDCOLOR}"
npm install
# sudo dpkg --configure -a
# sudo apt install lolcat -y



echo -e "\n"
echo -e "${MAGENTA}Please Enter Your Client User (dog/ui) : ${ENDCOLOR}"
read clientType

echo -e "${MAGENTA}Please Enter Your MAC Address : ${ENDCOLOR}"
read macA

# macA=$(ifconfig | grep ether | cut -d " " -f10)

apiKey=$(curl --location --request POST 'http://34.130.85.166:8000/genTok' \
--header 'Content-Type: application/json' \
--data-raw '{
    "clientType": "'$clientType'",
    "macA": "'$macA'"
}')

echo -e "${CYAN}Your API Key is : $apiKey${ENDCOLOR}"

echo -e "\n"

echo -e "Generating Binary Files For  ${GREEN}Windows🪟,${CYAN}Mac🍎 and ${YELLOW}Ubuntu🧑${ENDCOLOR}"
echo -e "\n"


sed "13 i let apiKey = '$apiKey'" app.js > app2.js
rm -rf app.js
cat app2.js > app.js
rm -rf app2.js

echo -e "${GREEN}Your Node Version is : $(node -v)${ENDCOLOR}"
echo -e "\n"

pkg app.js
# version=$(node -v)
sleep 20 & PID=$! 
echo "THIS MAY TAKE A WHILE, PLEASE BE PATIENT WHILE ITS RUNNING..."

printf "["
while kill -0 $PID 2> /dev/null; do 
    printf  "▓"
    sleep 0.3

done


printf "] done!"

echo -e "\n"



sed "13d" app.js >> app2.js
cat app2.js > app.js
rm -rf app2.js


echo  -e "${CYAN} Check the Files Which Has Been Created Inside a Binary Folder $pwd ${ENDCOLOR}"
mkdir Binary
mv app-linux  app-macos  app-win.exe ./Binary
cd Binary

echo -e "\n"
ls 


# echo "Would you like to share the Binary With Your Friends [Y/n]?" && read option

# if [[ $option == "Y" || "y" || "yes" || "Yes" || "YES" ]]
# then
#   echo "Turning On Python Server at 8001 🚀"
#   ipaddr=ifconfig | grep -Eo 'inet (addr:)?([0-9]*\.){3}[0-9]*' | grep -Eo '([0-9]*\.){3}[0-9]*' | grep -v '127.0.0.1'
#   echo $ipaddr
#   python3 -m http.server 8001 &
#   echo "Share this IP With Your Friends $ipaddr :8001"


# else
#   echo "Thank You For Using The Script ✨"
# fi





