import React from 'react'

const Character = () => {
  return (
    <div>
        <form action="">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required />
            <br />
            <label for="skin">Skin Color:</label>
            <input type="color" id="skin" name="skin" required />
            <br />
            <label for="ammunation">Ammunation</label>
            <select name="" id="">
                <option value="pistol">Pistol</option>
                <option value="rifle">Rifle</option>
                <option value="shotgun">Shotgun</option>
            </select>

            <br />

            
        </form>
    </div>
  )
}

export default Character