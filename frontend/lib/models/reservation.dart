class Reservation {
  final int? id;
  final String name;
  final String phone;
  final int guests;
  final DateTime date;
  final String time;
  final String status; // 'pending', 'confirmed', 'cancelled'

  Reservation({
    this.id,
    required this.name,
    required this.phone,
    required this.guests,
    required this.date,
    required this.time,
    this.status = 'confirmed',
  });

  factory Reservation.fromJson(Map<String, dynamic> json) {
    return Reservation(
      id: json['id'],
      name: json['name'],
      phone: json['phone'],
      guests: json['guests'],
      date: DateTime.parse(json['date']),
      time: json['time'],
      status: json['status'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'phone': phone,
      'guests': guests,
      'date': date.toIso8601String().split('T')[0],
      'time': time,
      'status': status,
    };
  }
}
