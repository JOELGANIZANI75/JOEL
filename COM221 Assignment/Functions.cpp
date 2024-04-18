#include <iostream>
using namespace std;


int calculateSquareArea(int sideLength) {
    return sideLength * sideLength;
}


int calculateRectangleArea(int length, int width) {
    return length * width;
}


double calculateTriangleArea(int base, int height) {
    return 0.5 * base * height;
}

int main() {
    int selection;
    bool isValid = false;
    string Area4="quit program";

    while (!isValid) {
        cout << "please select the area of the shape caculate. \n" "(1) square. \n" "(2)rectangle. \n" "(3)triangle.\n" "(4)quit program"<<endl;
        
        cout<<"enter selection. \n";
        cin >> selection;

        if (selection == 1) {
            int sideLength;
            cout << "Enter the length: ";
            cin >> sideLength;
            cout << "Area of the square: " << calculateSquareArea(sideLength) << endl;
        }
        else if (selection == 2) {
            int length, width;
            cout << "Enter the length: ";
            cin >> length;
            cout << "Enter the width: ";
            cin >> width;
            cout << "Area of the rectangle: " << calculateRectangleArea(length, width) << endl;
        }
        else if (selection == 3) {
            int base, height;
            cout << "Enter the base: ";
            cin >> base;
            cout << "Enter the height: ";
            cin >> height;
            cout << "Area of the triangle: " << calculateTriangleArea(base, height) << endl;
        }
        else if (selection == 4) {
            cout << Area4 << endl;
            isValid = true;
        }
        else {
            cout << "Invalid input. Please enter a valid selection." << endl;
        }
    }

    return 0;
}
