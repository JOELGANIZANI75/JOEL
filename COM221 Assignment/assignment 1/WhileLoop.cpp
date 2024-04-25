#include <iostream>
using namespace std;

int main() {    
    int a;
    bool isValid = false;
    
    while (!isValid) {
        cout << "Enter an integer value between 5 and 10: ";
        cin >> a;

        if (a >= 5 && a <= 10) {
            isValid = true;
            cout << "Your input value (" << a << ") has been accepted" << endl;
        }
        else {
            cout << "The number " << a << " is not between 5 and 10. Please enter a correct one." << endl;
        }
    }

    return 0;
}