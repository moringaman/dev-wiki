(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{163:function(t,n,e){"use strict";e.r(n);var a=e(0),i=Object(a.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"content"},[n("h1",{attrs:{id:"crypto-zombies-game-contracts-documented"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#crypto-zombies-game-contracts-documented","aria-hidden":"true"}},[this._v("#")]),this._v(" Crypto Zombies Game contracts documented")]),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[this._v("pragma solidity ^0.4.19;\n\ncontract ZombieFactory {\n\n    // declare our event here\n        event NewZombie(uint zombieId, string name, uint dna);\n\t\n    uint dnaDigits = 16;\n    uint dnaModulus = 10 ** dnaDigits;\n\t\t\n    struct Zombie {\n        string name;\n        uint dna;\n        }\n\t\t\t\t\t\n    Zombie[] public zombies;\n\t\t\t\t\t    \n    function _createZombie(string _name, uint _dna) private {\n    uint id = zombies.push(Zombie(_name, _dna)) - 1;\n        // and fire it here\n     NewZombie(id,_name, _dna);\n    } \n\t\t\t\t\t\t\t\t\t    \n    function _generateRandomDna(string _str) private view returns (uint) {\n        uint rand = uint(keccak256(_str));\n        return rand % dnaModulus;\n    }\n\t\t\t\t\t\t\t\t\t\t\t\t    \n     function createRandomZombie(string _name) public {\n        uint randDna = _generateRandomDna(_name);\n        _createZombie(_name, randDna);\n    }\n\t\t\t\t\t\t\t    \n    }\n")])])])])}],!1,null,null,null);n.default=i.exports}}]);