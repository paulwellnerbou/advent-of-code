declare global {
    interface String {
        distinct(): string;
    }
}

String.prototype.distinct = function (): string {
    const strArray = this.split("")
    return strArray.filter((value, index) => strArray.indexOf(value) == index).join("")
}

export { }
