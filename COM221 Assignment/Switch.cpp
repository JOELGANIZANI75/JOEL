#include<iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int main(){
    
    srand(time(0)); // Seed the random number generator
    
    int DaysUntilExpiration = rand() % 11; // Generate a random number between 0 and 10
    cout << "Number of days remaining: " << DaysUntilExpiration << endl;
    
    switch(DaysUntilExpiration){
        case 10:
        case 9:
        case 8:
        case 7:
        case 6:
            cout << "Your subscription will expire soon. Renew now!" << endl;
            break;
        case 5:
        case 4:
        case 3:
        case 2:
            cout << "Your subscription expires in " << DaysUntilExpiration << " days. Renew now and save 10%!" << endl;
            break;
        case 1:
            cout << "Your subscription expires in " << DaysUntilExpiration << " day. Renew now" << endl;
            break;
        case 0:
            cout << "Your subscription has expired." << endl;
            break;
        default:
            cout << "You have an active subscription." << endl;
            break;
    }
    
    return 0;
}