#include <iostream>
#include <string>
using namespace std;

int main() {
    int* dynamicInt = new int;
    string* dynamicString = new string;

    cout << "Enter an integer: ";
    cin >> *dynamicInt;

    cout << "Enter a string: ";
    cin >> *dynamicString;

    
    cout<<"the value of entered Integer is:"<< *dynamicInt << endl;
    cout<<"the value of entered string is:"<< *dynamicString << endl;
    
    
    delete dynamicInt;
    delete dynamicString;

    return 0;
}