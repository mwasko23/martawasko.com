"""
Episode 06: Data Exploration Demo
---------------------------------
This script shows why Python beats manual Excel work.
Run this after setting up your environment!
"""

import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# ============================================
# COLOR PALETTES (Best Practice: Tableau 10 inspired)
# ============================================

# Categorical palette - distinct hues for different categories
CATEGORICAL = ['#4E79A7', '#F28E2B', '#E15759', '#76B7B2', '#59A14F']  # Blue, Orange, Red, Teal, Green

# Status colors - meaningful associations
STATUS_COLORS = {
    'Active': '#59A14F',    # Green = good/active
    'Pending': '#F28E2B',   # Orange = waiting
    'On Hold': '#EDC948',   # Yellow = paused
    'Inactive': '#E15759'   # Red = inactive/warning
}

# Sequential palette for ordered data (teal gradient)
SEQUENTIAL = ['#C7E9E5', '#9DD3CC', '#6DBFB3', '#3DAB9A', '#1E8A7E']

# ============================================
# PART 1: LOAD AND EXPLORE
# ============================================

# Load the data (change path if needed)
df = pd.read_excel('input/sample_data.xlsx')

# Quick overview - what do we have?
print("=" * 50)
print("DATASET OVERVIEW")
print("=" * 50)
print(f"Total customers: {len(df):,}")
print(f"Columns: {len(df.columns)}")
print(f"Date range: {df['Join_Date'].min()} to {df['Join_Date'].max()}")
print()

# ============================================
# PART 2: QUICK STATS (Try doing this manually!)
# ============================================

print("=" * 50)
print("SPENDING STATISTICS")
print("=" * 50)
print(f"Total revenue:    ${df['Total_Spent'].sum():,.2f}")
print(f"Average spend:    ${df['Total_Spent'].mean():,.2f}")
print(f"Median spend:     ${df['Total_Spent'].median():,.2f}")
print(f"Highest spender:  ${df['Total_Spent'].max():,.2f}")
print(f"Lowest spender:   ${df['Total_Spent'].min():,.2f}")
print()

# ============================================
# PART 3: BREAKDOWNS
# ============================================

print("=" * 50)
print("CUSTOMERS BY STATUS")
print("=" * 50)
print(df['Status'].value_counts())
print()

print("=" * 50)
print("CUSTOMERS BY REGION")
print("=" * 50)
print(df['Region'].value_counts())
print()

print("=" * 50)
print("TOP 5 CITIES")
print("=" * 50)
print(df['City'].value_counts().head())
print()

print("=" * 50)
print("AVERAGE SPEND BY DEPARTMENT")
print("=" * 50)
avg_by_dept = df.groupby('Department')['Total_Spent'].mean().sort_values(ascending=False)
for dept, avg in avg_by_dept.items():
    print(f"{dept:12} ${avg:,.2f}")
print()

# ============================================
# PART 4: FIND SPECIFIC CUSTOMERS
# ============================================

print("=" * 50)
print("HIGH-VALUE CUSTOMERS (Spent > $5,000)")
print("=" * 50)
high_value = df[df['Total_Spent'] > 5000]
print(f"Count: {len(high_value)}")
print(high_value[['First_Name', 'Last_Name', 'Company', 'Total_Spent']].head(10))
print()

# ============================================
# PART 5: VISUALIZATIONS (with proper color palettes!)
# ============================================

# Set a clean style
plt.style.use('seaborn-v0_8-whitegrid')
fig, axes = plt.subplots(2, 2, figsize=(12, 10))
fig.suptitle('Customer Data Analysis', fontsize=16, fontweight='bold', color='#2D3748')

# --------------------------------------------------------
# Chart 1: Customers by Region - CATEGORICAL COLORS
# Each region gets a distinct hue for easy comparison
# --------------------------------------------------------
ax1 = axes[0, 0]
region_counts = df['Region'].value_counts()
bars = ax1.bar(region_counts.index, region_counts.values, 
               color=CATEGORICAL[:len(region_counts)], edgecolor='white', linewidth=1.5)
ax1.set_title('Customers by Region', fontweight='bold', fontsize=12, color='#2D3748')
ax1.set_ylabel('Count', color='#4A5568')
ax1.tick_params(colors='#4A5568')
ax1.set_facecolor('#FAFAFA')
for bar, val in zip(bars, region_counts.values):
    ax1.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 5, str(val), 
             ha='center', va='bottom', fontsize=10, fontweight='bold', color='#2D3748')

# --------------------------------------------------------
# Chart 2: Status Distribution - MEANINGFUL STATUS COLORS
# Green=Active, Orange=Pending, Yellow=On Hold, Red=Inactive
# --------------------------------------------------------
ax2 = axes[0, 1]
status_counts = df['Status'].value_counts()
# Map colors to match status meaning
pie_colors = [STATUS_COLORS[status] for status in status_counts.index]
wedges, texts, autotexts = ax2.pie(status_counts.values, labels=status_counts.index, 
                                    autopct='%1.1f%%', colors=pie_colors, startangle=90,
                                    wedgeprops={'edgecolor': 'white', 'linewidth': 2})
for autotext in autotexts:
    autotext.set_color('white')
    autotext.set_fontweight('bold')
ax2.set_title('Customer Status Distribution', fontweight='bold', fontsize=12, color='#2D3748')

# --------------------------------------------------------
# Chart 3: Spending Distribution - SINGLE COLOR + ACCENTS
# Histogram uses one color; mean/median use contrasting colors
# --------------------------------------------------------
ax3 = axes[1, 0]
ax3.hist(df['Total_Spent'], bins=30, color='#4E79A7', edgecolor='white', alpha=0.85)
ax3.axvline(df['Total_Spent'].mean(), color='#E15759', linestyle='--', linewidth=2.5, 
            label=f"Mean: ${df['Total_Spent'].mean():,.0f}")
ax3.axvline(df['Total_Spent'].median(), color='#59A14F', linestyle='--', linewidth=2.5, 
            label=f"Median: ${df['Total_Spent'].median():,.0f}")
ax3.set_title('Spending Distribution', fontweight='bold', fontsize=12, color='#2D3748')
ax3.set_xlabel('Total Spent ($)', color='#4A5568')
ax3.set_ylabel('Number of Customers', color='#4A5568')
ax3.tick_params(colors='#4A5568')
ax3.set_facecolor('#FAFAFA')
ax3.legend(frameon=True, facecolor='white', edgecolor='#E2E8F0')

# --------------------------------------------------------
# Chart 4: Average Spend by Department - SEQUENTIAL GRADIENT
# Higher values = darker colors (shows ranking visually)
# --------------------------------------------------------
ax4 = axes[1, 1]
avg_by_dept_sorted = avg_by_dept.sort_values()
# Create gradient based on values (low=light, high=dark)
norm_values = (avg_by_dept_sorted.values - avg_by_dept_sorted.values.min()) / \
              (avg_by_dept_sorted.values.max() - avg_by_dept_sorted.values.min())
# Use a teal colormap for sequential data
cmap = plt.cm.get_cmap('YlGnBu')
bar_colors = [cmap(0.3 + 0.6 * v) for v in norm_values]  # Range from 0.3 to 0.9

bars = ax4.barh(avg_by_dept_sorted.index, avg_by_dept_sorted.values, 
                color=bar_colors, edgecolor='white', linewidth=1)
ax4.set_title('Average Spend by Department', fontweight='bold', fontsize=12, color='#2D3748')
ax4.set_xlabel('Average Spend ($)', color='#4A5568')
ax4.tick_params(colors='#4A5568')
ax4.set_facecolor('#FAFAFA')
for i, val in enumerate(avg_by_dept_sorted.values):
    ax4.text(val + 30, i, f'${val:,.0f}', va='center', fontsize=9, color='#2D3748')

plt.tight_layout()
plt.savefig('output/customer_analysis.png', dpi=150, bbox_inches='tight', facecolor='white')
plt.show()

print("=" * 50)
print("✓ Charts saved to: output/customer_analysis.png")
print("=" * 50)
