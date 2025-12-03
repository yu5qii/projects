#include <iostream>
#include <string>
using namespace std;

//ENCAPSULATION: binding data members and methods into a single unit.
//implementation of encap~: declating private variables, using getter and setter functions, apply proper access specifier

class account 
{
    private:        //defining private variables
        string name;
        int ccv, crn;
    
    public:
        string getname()        //getter methods to access data
        {
            return name = "bloop";
        }
        int getccv()
        {
            return ccv = 0;
        }
        int getcrn()
        {
            return crn = 0;
        }

        void setname(string setname)       //setter method to set value of private data     
        {
            name = setname;
        }
        void setccv(int setccv)
        {
            ccv = setccv;
        }
        void setcrn(int setcrn)
        {
            crn = setcrn;
        }
};

int main()
{
    account ac;         //sets the name and ccv
    ac.setname("ridah abbasi");
    ac.setccv(110);
    ac.setcrn(86743);
    cout << "Name: " << ac.getname() << endl;
    cout << "CCV: " << ac.getccv() << endl;
    cout << "CRN: " << ac.getcrn() << endl;

    account bc;         //keeps the default value
    cout << "Name: " << bc.getname() << endl;
    cout << "CCV: " << bc.getccv() << endl;
    cout << "CRN: " << bc.getcrn() << endl;

    return 0;
}   