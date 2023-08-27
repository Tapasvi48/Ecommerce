#include<iostream>
using namespace std;

class node{
public:
int data;
node* right; 
node* left;
node(int d){
this->data=d;
this->right=NULL;
this->left=NULL;
}






};
node* buildTree(node *root){
int d;    
cout<<"enter data"<<endl;
cin>>d;
root=new node(d);
if(d==-1){
    return NULL;
}
cout<<"enter data for left of "<<d<<endl;
buildTree(root->left);
cout<<"enter data for right of "<<d<<endl;
buildTree(root->right);
}




int main(){
node* a=NULL;
a=buildTree(NULL);
return 0;

}