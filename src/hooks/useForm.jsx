import React, { useState } from 'react'

export const useForm = (initialObj = {}) => {

    const [form, setForm] = useState(initialObj);

    const changed = ({target}) => {
        //desesctructuramos el input del target con nombre y valor
        const {name, value} = target;
        setForm({
            //expandimos el contenido del objeto
            ...form,
            //y aqui asignamos los nuevos valores o los nuevos elementos que se agreguen al objeto
            [name]: value
        })

        console.log(form);
        console.log(target);
    }


    return {
        form,
        changed,
    }
}
