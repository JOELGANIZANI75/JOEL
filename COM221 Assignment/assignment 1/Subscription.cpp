#include<iostream>
#include <cstdlib>
#include <ctime>
using namespace std;

int main(){
    
    srand(time(0)); // Seed the random number generator
    
    int DaysUntilExpiration = rand() % 11; // Generate a random number between 0 and 10
    cout << "Number of days remaining: " << DaysUntilExpiration << endl;
    
    if(DaysUntilExpiration<=10 && DaysUntilExpiration>=6 ){
        cout << "Your subscription will expire soon. Renew now!" << endl;
    }
    else if(DaysUntilExpiration<= 5 && DaysUntilExpiration>=2){
        cout << "Your subscription expires in " << DaysUntilExpiration << " days. Renew now and save 10%!" << endl;
    }
    else if(DaysUntilExpiration == 1){
        cout << "Your subscription expires within "<<DaysUntilExpiration<< " day.Renew now and save 20%!" << endl;
    }
    else if(DaysUntilExpiration == 0){
        cout << "Your subscription has expired." << endl;
    }
    else{
        cout << "You have an active subscription." << endl;
    }
    
    return 0;
}