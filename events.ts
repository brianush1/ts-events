export interface SignalConnection {
	disconnect(): void;
}

export class Signal<T extends any[]> {
	private connections: ((...args: T) => void)[] = [];
	
	connect(handler: (...args: T) => void) {
		this.connections.push(handler);
		return {
			disconnect: () => {
				const i = this.connections.indexOf(handler);
				if (i < 0) throw new Error("handler has already been disconnected");
				this.connections.splice(i, 1);
			}
		}
	}

	dispatch(...args: T) {
		for (const handler of this.connections) {
			handler(...args);
		}
	}
}
