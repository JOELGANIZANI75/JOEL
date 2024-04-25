#include <iostream>
#include <fstream>
#include <string>
#include <algorithm>
#include <cctype>
using namespace std;


int countVowels(string str) {
    int count = 0;
    for (char c : str) {
        if (tolower(c) == 'a' || tolower(c) == 'e' || tolower(c) == 'i' || tolower(c) == 'o' || tolower(c) == 'u') {
            count++;
        }
    }
    return count;
}


int countWords(string str) {
    int count = 0;
    bool inWord = false;
    
    for (char c : str) {
        if (isalpha(c)) {
            if (!inWord) {
                count++;
                inWord = true;
            }
        } else {
            inWord = false;
        }
    }
    
    return count;
}


string Reverse(string str) {
    reverse(str.begin(), str.end());
    return str;
}


string capitalizeSecondLetter(string str) {
    for (size_t i = 1; i < str.size(); ++i) {
        if (isalpha(str[i - 1]) && isalpha(str[i])) {
            str[i] = toupper(str[i]);
        }
    }
    return str;
}

int main() {
    string fileData;
    
    ifstream inputFile("input.txt");
    if (inputFile.is_open()) {
        string line;
        while (getline(inputFile, line)) {
            fileData += line;
        }
        inputFile.close();
    } else {
        cout << "Unable to open file." << endl;
        return 1;
    }

    cout << "Number of vowels in the text file statement: " << countVowels(fileData) << endl;
    cout << "Number of words in the text file statement: " << countWords(fileData) << endl;
    
    string reversedStatement = Reverse(fileData);
    cout << "Reversed statement: " << reversedStatement << endl;
    
    string capitalizedStatement = capitalizeSecondLetter(fileData);
    cout << "Statement with the second letter of each word capitalized: " << capitalizedStatement << endl;

    return 0;
}