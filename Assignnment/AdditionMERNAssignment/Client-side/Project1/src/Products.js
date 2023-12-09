
import React from "react";
import { useState,useEffect } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import './tables.css'
import './Popup.css'

function Products(){
    var [products,setProducts]=useState([]);
    var [product,setProduct]=useState({productid:0,producttitle:"",price:0,stock:0});
    var [style,setStyle]=useState("none");
   var isStock=0;
    const url="http://127.0.0.1:5000/products";

    const FetchRecord=()=>{
        axios.get(url).then((result)=>{
            setProducts(result.data);
        })

    }
    useEffect(()=>{FetchRecord()},[]);
    const isProductavail=(No)=>{
        if(No===0)
        {
            return "Not available"
        }
        else
        {
            return No;
        }
    }
    const OntextChange=(args)=>{
      
        var copyofProduct={...product,[args.target.name]:[args.target.value]};
       setProduct(copyofProduct);

    }
    const Update=()=>
    {
        setStyle("none");
        const updateurl=url+"/"+product.productid;
        console.log(updateurl)
        console.log(product)
        axios.put(updateurl,product).then(()=>{FetchRecord()})
        
    }
    const isUpdateallowed=()=>
    {
        setStyle("disp")

    }
    const Edit=(No)=>
    {
        for(var i=0;i<products.length;i++)
        {
            if(products[i].productid===No)
            {
                var cp=products[i];
            }
        }
        setProduct(cp);
    }
    const Delete=(No)=>
    {
        setStyle("disp") 
        Edit(No);
    }
    const DeleteRecord=()=>
    {
        var deleteurl=url+"/"+product.productid;
        axios.delete(deleteurl).then(()=>{FetchRecord()
        setStyle("none")});
    }
    return (<>
    <div className="container">
        <div className={style}>
            Do You want to Update
            <button className="btn btn-primary" onClick={Update}>Update</button>
        
        </div>
        <div className={style}>
            Do You want to Delete
            <button className="btn btn-primary" onClick={DeleteRecord}>Delete</button>
        
        </div>
        <hr />
        <center>
            <table>
            <tbody>
                <tr>
                    <td>
                    Product Id
                    </td>
                    <td>
                        <input type="number" name="productid" value={product.productid} onChange={OntextChange}/>
                    </td>
                </tr>
                <tr>
                    <td>
                    Product title
                    </td>
                    <td>
                        <input type="text" name="producttitle" value={product.producttitle} onChange={OntextChange}/>

                    </td>
                </tr>
                <tr>
                    <td>
                    Product price
                    </td>
                    <td>
                        <input type="text" name="price" value={product.price} onChange={OntextChange}/>
                    </td>
                </tr>
                <tr>
                    <td>
                    Product stock
                    </td>
                    <td>
                        <input type="text" name="stock" value={product.stock} onChange={OntextChange}/>
                    </td>
                </tr>
                <tr>
                    <td><button className="btn btn-primary" onClick={isUpdateallowed}>Update</button></td>
                </tr>
                   
                
            </tbody>
            </table>
        </center>
        <hr />

        <div className="table-responsive">
            <table className="table table-bordered" id="resulttable">
                
               
                    <thead>
                        <tr>
                            <th>Product Id</th>
                            <th>Product Title</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product)=>{

                              return ( <tr>
                                    <td>{product.productid}</td>
                                    <td>{product.producttitle}</td>
                                    <td>{product.price}</td>
                                    <td>{isStock=isProductavail(product.stock)}</td>
                                    <td><button className="btn btn-danger" onClick={()=>{Delete(product.productid)}}>Delete</button></td>
                                    <td><button className="btn btn-success" onClick={()=>{Edit(product.productid)}}>Update</button></td>
                                </tr>)
                            })
                        }
                    </tbody>
            </table>
        </div>
    </div>
    </>);
}

export default Products;