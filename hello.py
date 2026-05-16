import networkx as nx
import matplotlib.pyplot as plt

def simulate_traffic_routing():
    # 1. Initialize a Directed Graph
    G = nx.DiGraph()

    # 2. Define the city grid (Edges)
    # Format: (Start, End, {'base_time': mins, 'traffic_level': 0-10})
    road_network = [
        ('A', 'B', {'base': 5, 'traffic': 8}),  # Heavy traffic
        ('A', 'C', {'base': 8, 'traffic': 1}),  # Clear road
        ('B', 'D', {'base': 6, 'traffic': 5}),  # Moderate traffic
        ('C', 'D', {'base': 4, 'traffic': 2}),  # Clear road
        ('B', 'E', {'base': 12, 'traffic': 0}), # Long but clear
        ('D', 'E', {'base': 7, 'traffic': 3})   # Moderate traffic
    ]
    G.add_edges_from(road_network)

    # 3. Calculate Dynamic Weights for Dijkstra
    alpha = 1.0  # Traffic multiplier (how much traffic affects base time)
    for u, v, data in G.edges(data=True):
        # dynamic_weight = base_time + (alpha * traffic_level)
        data['weight'] = data['base'] + (alpha * data['traffic'])

    # 4. Run Dijkstra's Algorithm
    start_node = 'A'
    end_node = 'E'
    
    # NetworkX uses Dijkstra under the hood when a 'weight' attribute is specified
    optimal_path = nx.shortest_path(G, source=start_node, target=end_node, weight='weight')
    path_edges = list(zip(optimal_path, optimal_path[1:]))

    # Calculate total time for the title readout
    total_time = nx.shortest_path_length(G, source=start_node, target=end_node, weight='weight')

    # 5. Build the Visual GUI (Matplotlib)
    # Manually position nodes to look like a city map
    pos = {
        'A': (0, 1),
        'B': (1, 2),
        'C': (1, 0),
        'D': (2, 1.5),
        'E': (3, 1)
    }

    plt.figure(figsize=(10, 6))
    plt.title(f"Dynamic Traffic Routing\nOptimal Route: {' -> '.join(optimal_path)} | Total Time: {total_time} mins", 
              fontsize=14, fontweight='bold')

    # Draw standard nodes
    nx.draw_networkx_nodes(G, pos, node_size=800, node_color='#4CA1AF', edgecolors='black')
    
    # Draw standard edges (gray, semi-transparent)
    nx.draw_networkx_edges(G, pos, edgelist=G.edges(), width=2, alpha=0.3, edge_color='black', arrows=True)
    
    # Draw optimal path edges (thick, highlighted)
    nx.draw_networkx_edges(G, pos, edgelist=path_edges, width=5, edge_color='#FF4B2B', arrows=True)

    # Add Node Labels
    nx.draw_networkx_labels(G, pos, font_size=12, font_family="sans-serif", font_weight='bold', font_color='white')

    # Add Edge Labels (showing the math: Base + Traffic = Total Weight)
    edge_labels = {
        (u, v): f"{d['base']}m + {d['traffic']}t\n= {d['weight']}m" 
        for u, v, d in G.edges(data=True)
    }
    nx.draw_networkx_edge_labels(G, pos, edge_labels=edge_labels, font_size=9, font_color='darkred')

    # Display the GUI
    plt.axis('off') # Hide axes for a cleaner map look
    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    simulate_traffic_routing()
    