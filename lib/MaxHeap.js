const swap = require('./swap');

class MaxHeap {
	constructor(nodeList) {
		this[Symbol.for('heap')] = nodeList;
		MaxHeap.makeHeap(this[Symbol.for('heap')]);
	}

	add(node) {
		let heap = this[Symbol.for('heap')];
		heap.push(node);
		MaxHeap.fixedUp(heap, heap.length - 1);
	}

	delete() {
		let heap = this[Symbol.for('heap')];
		let deleteNode = heap[0];
		heap[0] = heap[heap.length - 1];
		heap.pop();
		MaxHeap.fixedDown(heap, 0, heap.length);
		return deleteNode;
	}

	toAscendArray() {
		let heap = this[Symbol.for('heap')].slice();
		for(let i=heap.length - 1; i >=1; i--) {
			swap(heap, i, 0);
			MaxHeap.fixedDown(heap, 0, i);
		}

		return heap;
	}

	static makeHeap(arr) {
		for(let i=Math.floor(arr.length/2) - 1; i>=0; i--) {
			MaxHeap.fixedDown(arr, i, arr.length);
		}
	}

	static fixedDown(arr, idx, n) {
		let maxChildIdx = idx * 2 + 1,
			adjustVal = arr[idx];
		while(maxChildIdx < n) {
			if(maxChildIdx + 1 < n && arr[maxChildIdx] < arr[maxChildIdx + 1]) {
				maxChildIdx += 1;
			}
			if(arr[maxChildIdx] < adjustVal) {
				break;
			}

			arr[idx] = arr[maxChildIdx];
			idx = maxChildIdx;
			maxChildIdx = idx * 2 + 1;
		}
		arr[idx] = adjustVal;
	}

	static fixedUp(arr, idx) {
		let parrentIdx = Math.floor((idx - 1)/2);
		let adjustVal = arr[idx];

		while(parrentIdx >= 0 && idx !== 0) {
			if(arr[parrentIdx] > adjustVal) {
				break;
			}
			arr[idx] = arr[parrentIdx];
			idx = parrentIdx;
			parrentIdx = Math.floor((idx - 1)/2);
		}

		arr[idx] = adjustVal;
	}

	valueOf() {
		return this[Symbol.for('heap')];
	}
}

module.exports = MaxHeap;