class AmmInputCheckboxElement extends HTMLElement 
{
    slots = null;
        
    constructor() 
    {
      super();
      this.horizontal = this.hasAttribute('horizontal');
      this.slots = [].slice.call(this.children);
    }
    
    
    removeMarks()
    {
        var markContainers = this.getElementsByClassName("checkbox");

        for (var i=0; i<markContainers.length; i++)
        {
            markContainers[i].innerHTML = '';
        }
    }
    
    
    getElementState()
    {       
        var elements = this.getElementsByClassName("checkbox");
        var returnObject = [];

        for (var i=0; i<elements.length; i++)
        {
            returnObject[i] = elements[i].innerHTML == '' ? false : true;
        }         
        return returnObject;
    }
    
    connectedCallback() 
    {
        this.innerHTML = '';
        if (this.horizontal)
        {
            this.style.display = 'flex';
        }
        
        for (var i=0; i<this.slots.length; i++)
        {
            if (this.slots[i].hasAttribute('disabled'))
            {
                this.innerHTML += '<div class="checkbox-item checkbox-item-disabled"><div class="checkbox"> <div class="checkbox-check"></div> </div><label>' + this.slots[i].innerHTML + '</label></div>';
                
            }
            else if (this.slots[i].hasAttribute('selected'))
            {
                this.innerHTML += '<div class="checkbox-item"><div class="checkbox"><div class="checkbox-check"></div></div><label>' + this.slots[i].innerHTML + '</label></div>';
            }
            else
            {
                this.innerHTML += '<div class="checkbox-item" ><div class="checkbox"></div><label>' + this.slots[i].innerHTML + '</label></div>';
            }    
        }
        
        this.addEventListener('click', e => this.inputListener(e));
    }


    inputListener(event)
    {
        var parent = event.target.parentNode;
        var target = event.target;
        var child = event.target.children[0];
        
        /*
        console.log("parent", parent);
        console.log("target", target);
        console.log("child", child);
        */
        
        if (target.className == 'checkbox')
        {                   
            if (target.innerHTML)
            {
                target.innerHTML = '';
            }
            else
            {               
                target.innerHTML = '<div class="checkbox-check"></div>';
            }
        }
        
        if (target.className == 'checkbox-item')
        {            
            if (target.children[0].innerHTML)
            {
                target.children[0].innerHTML = '';
            }
            else
            {
                target.children[0].innerHTML = '<div class="checkbox-check"></div>';
            }
        }
        
        if (target.nodeName == 'LABEL')
        {
            if (parent.children[0].innerHTML)
            {
                parent.children[0].innerHTML = '';
            }
            else
            {
                parent.children[0].innerHTML = '<div class="checkbox-check"></div>';
            }
        }
        
        if (target.className == 'checkbox-check')
        {            
            if (parent.innerHTML)
            {
                parent.innerHTML = '';
            }           
        }
             
    }

}

customElements.define( 'amm-checkbox', AmmInputCheckboxElement );
