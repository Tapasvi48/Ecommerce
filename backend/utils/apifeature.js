class Apifeature{
constructor(query,queryStr){
this.query=query;
this.queryStr=queryStr;
}
search(){
const keyword=this.queryStr.keyword?{
name:{
    $regex:this.queryStr.keyword,
    $options:"i",}}
    :{};
    console.log(keyword);
    this.query=this.query.find({...keyword});
    return this;}
filter(){
//category ke lie
//objects passed as refernce 
const querycopy={...this.queryStr};
const removeFields=["keyword","page","limit"];
console.log(querycopy);
removeFields.forEach(key=>delete querycopy[key]);

//filter for price and rating 

let queryStr=JSON.stringify(querycopy);
queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=> `$${key}`);



this.query=this.query.find(JSON.parse(queryStr));
return this;}
pagination(resultperpage){
    const currentPage=Number(this.queryStr.page)||1;
    //50   10
    const skip=resultperpage*(currentPage-1);

this.query.limit=this.query.limit(resultperpage).skip(skip);
return this;   


}







}

module.exports=Apifeature;