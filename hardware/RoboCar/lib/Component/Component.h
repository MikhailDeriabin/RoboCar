#ifndef COMPONENT_H
#define COMPONENT_H

#include <Status.h>
#include <CommandValue.h>

class Component{
protected:
    int id;
    Status status;
    char* name;
public:
    Component();
   
    virtual void giveCommand(Status status, char* value, int valueSize) = 0;

    int getId();
    void setId(int id);
    Status getStatus();
    void setStatus(Status status);
    char* getName();
    void setName(char name[]);
    virtual char* toString();
};

#endif