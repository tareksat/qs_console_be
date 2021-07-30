#include <iostream>



int main()
{
    int result;

    result = system("taskkill /f /im node.exe");

    result = system("npm i");

    result = system("npm start &");

}