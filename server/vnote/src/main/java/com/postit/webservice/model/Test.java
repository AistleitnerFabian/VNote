package com.postit.webservice.model;

public class Test {
    private String name;

    public Test(String name){
        this.setName(name);
    }

    public void setName(String name){
        this.name = name;
    }

    public String getName(){
        return this.name;
    }
}
