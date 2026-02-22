class Marker {
    #symbol = '';

    constructor(symbol) {
        this.#symbol = symbol;
    }

    isNought() {
        return this.#symbol === 'O'
    }

    isCross() {
        return this.#symbol === 'X'
    }

    isBlank() {
        return this.#symbol === 'blank'
    }

    equals(otherMarker) {
        return this.#symbol === otherMarker.#symbol;
    }
}

class Nought extends Marker {
    constructor() {
        super('O');
    }
}

class Cross extends Marker {
    constructor() {
        super('X');
    }
}

class BlankMarker extends Marker {
    constructor() {
        super('blank');
    }
}

class Player {

    constructor(name, marker) {
        this.name = name;
        this.marker = marker;
    }

    getName() {
        return this.name
    }

    getMarker() {
        return this.marker
    }

    changeName(newName) {
        this.name = newName;
        return this.name;
    } 
}

