import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Equipment = () => {
  return (
    <div>
      <Header />
      <div>
        <h1>Equipment</h1>
        <div>
          <h2>Weapons</h2>
          <div>
            <p>Weapon 1</p>
            <p>Weapon 2</p>
            <p>Weapon 3</p>
          </div>
        </div>

        <div>
          <h2>Armor</h2>
          <div>
            <p>Armor 1</p>
            <p>Armor 2</p>
            <p>Armor 3</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Equipment;
