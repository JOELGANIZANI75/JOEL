#include<iostream>
using namespace std;
int main(){
    int NumberOfElements=0;
    int* dynamicArray=nullptr;
    
    cout<<"enter number of element of the array"<<endl;
    cin>>NumberOfElements;
    
     if (NumberOfElements>3){
         cout<<"Error: out of bound \n";
    }else{
        
    dynamicArray=new int[NumberOfElements];
    
    if(dynamicArray==nullptr){
        cout<<"Error: memory could not be allocated \n";
    
    }
    else{
        for(int i=0; i<NumberOfElements; i++){
        cout<< "enter number: \n";
        cin>> dynamicArray[i];
    }
    cout<<"you have entered: ";
    for(int j=0; j<NumberOfElements; j++){
        cout<<dynamicArray [j]<< ", ";
    }
    delete [] dynamicArray;
    }
    }
return 0;
}