
class AmmInputRadioElement extends HTMLElement 
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
        var markContainers = this.getElementsByClassName("radio");

        for (var i=0; i<markContainers.length; i++)
        {
            markContainers[i].innerHTML = '';
        }
    }
    
    getElementState()
    {       
        var elements = this.getElementsByClassName("radio");
        for (var i=0; i<elements.length; i++)
        {
            //returnObject[i] = elements[i].innerHTML == '' ? false : true;
            
            if (!elements[i].innerHTML == ''){
                return i;
            }
            
        }         
        return -1;
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
                this.innerHTML += '<div class="radio-item radio-item-disabled"><div class="radio"> </div><label>' + this.slots[i].innerHTML + '</label></div>';
                
            }
            else if (this.slots[i].hasAttribute('selected'))
            {
                this.innerHTML += '<div class="radio-item"><div class="radio"><div class="radio-dot"></div></div><label>' + this.slots[i].innerHTML + '</label></div>';
            }
            else
            {
                this.innerHTML += '<div class="radio-item" ><div class="radio"></div><label>' + this.slots[i].innerHTML + '</label></div>';
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
        
        if (target.nodeName == 'INPUT-RADIO')
        {
            //click on disabled item
        }
        else
        {        
            if (target.className == 'radio-dot')
            {    
                
                this.removeMarks();
                parent.innerHTML = '<div class="radio-dot"></div>';
            }
            else
            {
                this.removeMarks();
            }
                   
            
            if (target.className == 'radio')
            {  
                target.innerHTML = '<div class="radio-dot"></div>';
            }
            
            
            if (target.className == 'radio-item')
            { 
                target.children[0].innerHTML = '<div class="radio-dot"></div>';
            }
            
            if (target.nodeName == 'LABEL')
            {
                parent.children[0].innerHTML = '<div class="radio-dot"></div>';
            }
        }
    }

}

customElements.define( 'amm-radio', AmmInputRadioElement );

