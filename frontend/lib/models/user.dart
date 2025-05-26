class User {
  final String? id;
  final String email;
  final String? name;
  final String? phone;
  final String role; // 'client', 'staff', 'admin'
  final String? token;

  User({
    this.id,
    required this.email,
    this.name,
    this.phone,
    required this.role,
    this.token,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      email: json['email'],
      name: json['name'],
      phone: json['phone'],
      role: json['role'],
      token: json['token'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'name': name,
      'phone': phone,
      'role': role,
      'token': token,
    };
  }

  bool get isStaff => role == 'staff' || role == 'admin';
  bool get isAdmin => role == 'admin';
}
