'use strict';

const form = document.querySelector('form');
const updateData = document.querySelector('.data')

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    updateData.textContent = 'Loading...'

    const search = document.querySelector('.search').value; 
    fetch(`/weather?address=${search}`).then((response)=>{
        response.json().then((data)=>{
            data.error ? updateData.textContent = `${data.error}` : updateData.textContent = data.location + ' ' + data.forecast
        })
    })

})