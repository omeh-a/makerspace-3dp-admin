// Generic queue class
// Matt Rossouw (omeh-a)
// 08/22

export class Queue<T> {
    private _queue: T[];
    private _size: number;
    private _head: number;
    private _tail: number;
    private _length: number;
    constructor(size: number) {
        this._queue = new Array<T>(size);
        this._size = size;
        this._head = 0;
        this._tail = 0;
        this._length = 0;
    }
    public getlength(): number {
        return this._length;
    }
    public enqueue(item: T): void {
        this._queue[this._tail] = item;
        this._tail = (this._tail + 1) % this._size;
        this._length++;
    }
    public dequeue(): T {
        const item = this._queue[this._head];
        this._head = (this._head + 1) % this._size;
        this._length--;
        return item;
    }
}