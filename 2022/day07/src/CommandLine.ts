import { sum } from "../../common/utils"

export interface File {
    name: string
    size: number
}

export class Directory {
    name: string
    files: File[] = []
    subdirectories: Directory[] = []

    private _size: number | undefined
    private _parent: Directory | undefined

    constructor(name: string, parent: Directory | undefined = undefined) {
        this.name = name
        this._parent = parent
    }

    addSubDirectory(name: string) {
        this.subdirectories.push(new Directory(name, this))
    }

    public get parent(): Directory | undefined {
        return this._parent
    }

    calculateSize(): number {
        if(this._size === undefined) {
            this._size = sum(this.files.map(f => f.size)) + sum(this.subdirectories.map(d => d.calculateSize()))
        }
        return this._size
    }

    findDirectory(criteria: (dir: Directory) => boolean): Directory[] {
        const resultList : Directory[] = []
        if(criteria(this)) {
            resultList.push(this)
        }
        
        this.subdirectories.forEach(dir => {
            resultList.push(...dir.findDirectory(criteria))
        })

        return resultList
    }
}

export class CommandLine {

    private _filesystem = new Directory("/")
    private _currentDirectory = this.filesystem

    public get currentDirectory() {
        return this._currentDirectory
    }

    public get filesystem(): Directory {
        return this._filesystem
    }

    parse(line: string) {
        if (line.startsWith("$")) {
            if (line.startsWith("$ cd")) {
                const dir = line.split(" ")[2]
                if (dir == "/") {
                    this._currentDirectory = this.filesystem
                } else if (dir == "..") {
                    this._currentDirectory = this._currentDirectory.parent ?? (() => { throw new Error(`Error executing "cd ..", directory ${this._currentDirectory.name} does not have a parent.`)})();
                } else {
                    this._currentDirectory = this.currentDirectory.subdirectories.find(d => d.name === dir) ?? (() => { throw new Error(`Subdirectory ${dir} not found in ${this.currentDirectory.name}`) })();
                }
            }
        } else if (line.startsWith("dir")) {
            this.currentDirectory.addSubDirectory(line.split(" ")[1])
        } else {
            const file = line.split(" ")
            this.currentDirectory.files.push({name: file[1], size: +file[0]})
        }
    }
}
